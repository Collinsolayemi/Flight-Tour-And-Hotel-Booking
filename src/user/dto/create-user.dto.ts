import { ApiProperty } from '@nestjs/swagger';

import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
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
  @IsString()
  public readonly email: string;

  @ApiProperty({ example: '08154640543' })
  @IsNotEmpty()
  public readonly phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  profile_picture: any;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: String, format: 'date' })
  public readonly birthday: Date;
}
