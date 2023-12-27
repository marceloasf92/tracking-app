import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

jest.mock('bcryptjs', () => ({
  ...jest.requireActual('bcryptjs'),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn(),
}));

describe('LoginService', () => {
  let loginService: LoginService;
  let mockPrismaService: Partial<PrismaService>;

  beforeEach(async () => {
    mockPrismaService = {
      user: jest.fn() as any,
    };

    mockPrismaService.user.findUnique = jest
      .fn()
      .mockImplementation(({ where }) => {
        if (where.email === 'valid@example.com') {
          return Promise.resolve({
            id: 1,
            email: 'valid@example.com',
            password: 'hashedPassword',
          });
        }
        return Promise.resolve(null);
      });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('jwt.token.here');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
  });

  it('deve retornar um JWT token para credenciais válidas', async () => {
    const userCredentials = {
      email: 'valid@example.com',
      password: 'correctPassword',
    };

    const expectedToken = 'jwt.token.here';

    const result = await loginService.validateUser(userCredentials);

    expect(result.token).toEqual(expectedToken);
  });

  it('deve lançar uma UnauthorizedException para credenciais inválidas', async () => {
    const userCredentials = {
      email: 'invalid@example.com',
      password: 'wrongPassword',
    };

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(loginService.validateUser(userCredentials)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
