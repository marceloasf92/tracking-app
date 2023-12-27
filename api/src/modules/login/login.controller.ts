import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { IUserLogin } from '../../interfaces/user-login.interface';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() userLoginDto: IUserLogin,
  ): Promise<{ token: string; informations: { name: string; id: number } }> {
    const { token, informations } =
      await this.loginService.validateUser(userLoginDto);
    return { token, informations };
  }
}
