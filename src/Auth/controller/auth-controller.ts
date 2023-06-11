import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Get,
} from '@nestjs/common';
import { SignUpDto } from '../dto/sign-up-dto';
import { SignInDto } from '../dto/sign-in-dto';
import { AuthService } from '../service/auth-service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Signup routes
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async createUser(@Body() body) {
    const user = await this.authService.signUp(body);
    return user;
  }


  //Signin route handler
  //   @HttpCode(HttpStatus.OK)
  //   @Post('/signin')
  //   async getUsers(@Body() body: SignInDto) {
  //     //     const newUser = await this.authService.signIn(body);
  //     //     return newUser;
  //   }
}
