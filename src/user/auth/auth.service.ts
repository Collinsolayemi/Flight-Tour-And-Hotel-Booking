import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth-dto';
import { UserService } from '../user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateToken(args: { id: number; email: string }): Promise<String> {
    const payLoad = args;

    return this.jwtService.signAsync(payLoad, { secret: process.env.JWT_SECRET });
  }
  async signup(signUpDto: SignUpDto) {
    // Check if the email is not already in use
    const checkEmail = await this.userService.findEmail(signUpDto.email);

    if (checkEmail) {
      throw new ConflictException('Email is already in use');
    }
    if (signUpDto.password !== signUpDto.confirm_password) {
      throw new BadRequestException('Passwords do not match')
    }
    
    // Hash the password in the database
    let passwordHash = await bcrypt.hash(signUpDto.password, 10);

    signUpDto.password = passwordHash;
    const user = await this.userService.create(signUpDto);
    return user;
  }

  async signIn(signInDto: SignInDto) {
    //check if user already have an account
    const checkUser = await this.userService.findUsername(signInDto.username);

    if (!checkUser) {
      throw new NotFoundException('User not found, please signup');
    }

    //compaare stored password with input password
    const compaarePassword = await bcrypt.compare(
      signInDto.password,
      checkUser.password,
    );

    if (!compaarePassword) {
      throw new NotFoundException(
        'Password incorrect , please retype your password',
      );
    }

    //generate token for a user when they signIn
    const token = await this.generateToken({
      id: checkUser.id,
      email: checkUser.username,
    });
    //Excluding the password field from the response body
    const { password: pass, ...others } = checkUser;
    return { token, ...others };
  }
}
