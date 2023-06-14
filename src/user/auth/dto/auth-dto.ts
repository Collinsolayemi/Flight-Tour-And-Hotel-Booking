import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
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
  public readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  profile_picture: any;

  @ApiProperty({ example: '08154640543' })
  @IsDefined()
  @IsPhoneNumber('NG')
  public readonly phone_number: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: Date, format: 'date' })
  public birthday: Date;
}

export class SignInDto {
  @ApiProperty({ example: 'name@example.com' })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  public readonly username: string;

  @ApiProperty({ example: 'password' })
  @IsString({ message: 'Password must be a string' })
  @Length(3, 20, { message: 'Password must be between 3 and 20 characters' })
  public readonly password: string;
}



export class ForgotPasswordDto {
  @IsNotEmpty({ message: "email is required"})
  @IsEmail()
  @ApiProperty({ example: 'name@example.com' })
  email: string;
}
