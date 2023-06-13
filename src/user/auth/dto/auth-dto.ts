import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class SignUpDto {
  id?: number;

  @ApiProperty({ example: 'username' })
  @IsString()
  @IsDefined()
  public readonly username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @Length(3, 20, { message: 'password must be between 3 and 20 characters' })
  public readonly password: string;

  @ApiProperty({ example: 'name@example.com' })
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({ example: '08154640543' })
  @IsNotEmpty()
  @IsPhoneNumber('NG')
  public readonly phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  profile_picture: any;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: Date, format: 'date' })
  public readonly birthday: Date;
}

export class SignInDto {
  public readonly id: string;

  @ApiProperty({ example: 'name@example.com' })
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @Length(3, 20, { message: 'password must be between 3 and 20 characters' })
  public readonly password: string;
}
