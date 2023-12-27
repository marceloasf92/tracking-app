import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaService } from '../../modules/prisma/prisma.service';

interface DecodedToken {
  userId: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.SECRET_KEY;

    if (!secret) {
      throw new Error('Secret key not configured');
    }

    try {
      const decoded = verify(token, secret) as DecodedToken;

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
