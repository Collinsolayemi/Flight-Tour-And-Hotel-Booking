import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto, VerifyForgetPasswordOtpDto, VerifySignUpOtpDto } from './dto/auth-dto';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class AuthController {
    private readonly authService;
    private userRepository;
    constructor(authService: AuthService, userRepository: Repository<User>);
    signUp(body: SignUpDto): Promise<{
        message: string;
    }>;
    uploadImagToCloudinary(file: any, req: Request): Promise<any>;
    verifySignupOtp(body: VerifySignUpOtpDto): Promise<{
        message: string;
    }>;
    signIn(body: SignInDto): Promise<{
        access_token: string;
        user: User;
    }>;
    forgotPassword(body: ForgotPasswordDto): Promise<{
        message: string;
        email: string;
    }>;
    verifyForgotPasswordOtp(body: VerifyForgetPasswordOtpDto): Promise<{
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getUserProfile(req: any): Promise<User>;
}
