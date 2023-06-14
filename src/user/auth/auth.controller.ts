import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, SignInDto, SignUpDto } from './dto/auth-dto';
import { AuthGuard } from './guards/auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('forgot-password')
 // @UseGuards(AuthGuard)
  async forgotPassword(
    @Body(new ValidationPipe()) body: ForgotPasswordDto,
  ): Promise<void> {
    await this.authService.forgotPassword(body);

    // Return success response or appropriate status code
  }

  // Other authentication routes (e.g., signup, signin)...
}
