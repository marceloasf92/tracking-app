import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserLogin } from '../../interfaces/user-login.interface';
import { compare } from 'bcryptjs';
import { sign as signJWT } from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoginService {
  constructor(private prismaService: PrismaService) {}

  async validateUser({ email, password }: IUserLogin): Promise<{
    token: string;
    informations: { name: string; id: number };
  }> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong email/password');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong email/password');
    }

    const token = signJWT(
      { userId: user.id, accountId: user.id },
      String(process.env.SECRET_KEY),
      {
        expiresIn: '1d',
      },
    );

    const informations = { name: user.name, id: user.id };

    return { token, informations };
  }
}
