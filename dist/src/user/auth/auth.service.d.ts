import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto, VerifyForgetPasswordOtpDto, VerifySignUpOtpDto } from './dto/auth-dto';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from './email/mail-service';
import { Otp } from '../entities/otp.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    private mailService;
    private otpRepository;
    private userRepository;
    clientAppUrl: string;
    cloudinary: any;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService, otpRepository: Repository<Otp>, userRepository: Repository<User>);
    generateOtp(): string;
    generateToken(args: {
        id: string;
        email: string;
    }): Promise<string>;
    signup(signUpDto: SignUpDto): Promise<{
        message: string;
    }>;
    verifySignUpOtp(verifyOtp: VerifySignUpOtpDto): Promise<{
        message: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
        user: User;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
        email: string;
    }>;
    image(image: any): Promise<any>;
    verifyForgetPasswordOtp(verifyOtp: VerifyForgetPasswordOtpDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
