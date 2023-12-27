import { AuthMiddleware } from './auth.middleware';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify as jwtVerify } from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let prismaService: PrismaService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    prismaService = new PrismaService();
    authMiddleware = new AuthMiddleware(prismaService);

    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  it('should throw UnauthorizedException if authorization header is missing', () => {
    mockRequest = {
      headers: {},
    };

    expect(() =>
      authMiddleware.use(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      ),
    ).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is not provided', () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer ',
      },
    };

    expect(() =>
      authMiddleware.use(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      ),
    ).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is invalid', () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer invalid.token.here',
      },
    };

    (jwtVerify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() =>
      authMiddleware.use(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction,
      ),
    ).toThrow(UnauthorizedException);
  });

  it('should call next() if token is valid', async () => {
    const user = {
      id: 1,
      name: 'Teste',
      email: 'teste@mail.com',
      password: 'hashedPassword123',
      admin: false,
    };
    mockRequest = {
      headers: {
        authorization: 'Bearer valid.token.here',
      },
    };

    (jwtVerify as jest.Mock).mockReturnValue({ userId: user.id });
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

    await authMiddleware.use(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalled();
    expect(mockRequest['user']).toEqual(user);
  });
});
