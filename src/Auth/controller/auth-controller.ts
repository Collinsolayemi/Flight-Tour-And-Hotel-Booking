import { Controller, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { SignUpDto } from '../dto/sign-up-dto';
import { SignInDto } from '../dto/sign-in-dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Signup routes
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authService.signUp(body);
    return user;
  }

  //Signin route handler
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async getUsers(@Body() body: SignInDto) {
    //     const newUser = await this.authService.signIn(body);
    //     return newUser;
  }
}
