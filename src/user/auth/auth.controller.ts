import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  Req,
  UploadedFile,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  VerifyForgetPasswordOtpDto,
  VerifySignUpOtpDto,
} from './dto/auth-dto';
import { AuthGuard } from './guards/auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
dotenv.config;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Post('signup')
  @ResponseMessage('signup successful')
  @HttpCode(201)
  async signUp(@Body() body: SignUpDto) {
    return await this.authService.signup(body);
  }

  @ApiBearerAuth('access-token')
  @Post('/upload/identification')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImagToCloudinary(@UploadedFile() file, @Req() req: Request) {
    try {
      const imageUrl = await this.authService.cloudinary.uploadImage(file);

      return imageUrl;
    } catch (error) {
      throw new BadRequestException('Error uploading picture');
    }
  }

  @Post('verify-signup-otp')
  @HttpCode(201)
  async verifySignupOtp(@Body() body: VerifySignUpOtpDto) {
    const verifySignupOtp = await this.authService.verifySignUpOtp(body);
    return verifySignupOtp;
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    const signInResult = await this.authService.signIn(body);
    return signInResult;
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body(new ValidationPipe()) body: ForgotPasswordDto) {
    const byEmail = await this.authService.forgotPassword(body);
    return byEmail;
  }

  @Post('verify-forgot-password-otp')
  @HttpCode(200)
  async verifyForgotPasswordOtp(@Body() body: VerifyForgetPasswordOtpDto) {
    const verify = await this.authService.verifyForgetPasswordOtp(body);
    return verify;
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() body: ResetPasswordDto) {
    const resetPassword = await this.authService.resetPassword(body);
    return resetPassword;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  @Get('/profile')
  async getUserProfile(@Req() req) {
    const user = req.user.email;
    const getUser = await this.userRepository.findOne({
      where: { email: user },
    });

    return getUser;
  }
}
