export declare class SignUpDto {
    readonly username: string;
    password: string;
    confirm_password: string;
    email: string;
    profile_picture: any;
    phone_number: string;
    birthday: Date;
    otp?: string;
    otpExpire?: Date;
}
export declare class SignInDto {
    username: string;
    password: string;
}
export declare class ResetPasswordDto {
    password: string;
    confirmPassword: string;
    email: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class VerifyForgetPasswordOtpDto {
    otp: string;
}
export declare class VerifySignUpOtpDto {
    otp: string;
}
