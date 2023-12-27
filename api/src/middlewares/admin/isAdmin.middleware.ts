import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  use(req: Request & { user?: User }, res: Response, next: NextFunction) {
    if (req.user && req.user.admin) {
      next();
    } else {
      throw new ForbiddenException(
        'Access denied. Only administrators can perform this action.',
      );
    }
  }
}
