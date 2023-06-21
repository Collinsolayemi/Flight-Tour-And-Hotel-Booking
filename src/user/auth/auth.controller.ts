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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    const signUpResult = await this.authService.signup(body);
    return signUpResult;
  }

  // @Post('upload-image')
  // async uploadImage() {
  //   const upload = await this.authService.image
  //   return upload
  //   }

  @UseGuards(AuthGuard)
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
  async verifySignupOtp(@Body() body: VerifySignUpOtpDto) {
    const verifySignupOtp = await this.authService.verifySignUpOtp(body);
    return verifySignupOtp;
  }

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    const signInResult = await this.authService.signIn(body);
    return signInResult;
  }

  @Post('forgot-password')
  async forgotPassword(@Body(new ValidationPipe()) body: ForgotPasswordDto) {
    const byEmail = await this.authService.forgotPassword(body);
    return byEmail;
  }

  @Post('verify-forgot-password-otp')
  async verifyForgotPasswordOtp(@Body() body: VerifyForgetPasswordOtpDto) {
    const verify = await this.authService.verifyForgetPasswordOtp(body);
    return verify;
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    const resetPassword = await this.authService.resetPassword(body);
    await resetPassword;
  }
}
