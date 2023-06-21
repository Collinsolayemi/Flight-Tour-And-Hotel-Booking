import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  isString,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  public readonly username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @Length(3, 20, { message: 'password must be between 3 and 20 characters' })
  public password: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @Length(3, 20, { message: 'password must be between 3 and 20 characters' })
  public confirm_password: string;

  @ApiProperty({ example: 'name@example.com' })
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  profile_picture: any;

  @ApiProperty({ example: '08154640543' })
  @IsDefined()
  @IsPhoneNumber('NG')
  public phone_number: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: Date, format: 'date' })
  public birthday: Date;

  @IsString()
  @IsOptional()
  public otp?: string;

  @IsOptional()
  public otpExpire?: Date;
}

export class SignInDto {
  @ApiProperty({ example: 'name@example.com' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  public username: string;

  @ApiProperty({ example: 'password' })
  @IsString({ message: 'Password must be a string' })
  @Length(3, 20, { message: 'Password must be between 3 and 20 characters' })
  public password: string;
}

export class ResetPasswordDto {
  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsOptional()
  @IsString()
  email: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'name@example.com' })
  @IsEmail()
  @IsString()
  public email: string;
}

export class VerifyForgetPasswordOtpDto {
  @IsString()
  otp: string;
}

export class VerifySignUpOtpDto {
  @IsString()
  otp: string;
}
