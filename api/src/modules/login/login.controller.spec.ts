import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginController', () => {
  let loginController: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should return a JWT token for valid credentials', async () => {
    const userCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockToken = 'jwt.token.here';
    const mockResponse = {
      token: mockToken,
      informations: {
        name: 'Test User',
        id: 1,
      },
    };

    jest.spyOn(loginService, 'validateUser').mockResolvedValue(mockResponse);

    expect(await loginController.loginUser(userCredentials)).toEqual(
      mockResponse,
    );
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    const userCredentials = {
      email: 'test@example.com',
      password: 'wrongPassword',
    };

    jest
      .spyOn(loginService, 'validateUser')
      .mockRejectedValue(new UnauthorizedException());

    await expect(loginController.loginUser(userCredentials)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
