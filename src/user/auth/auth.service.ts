import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth-dto';
import { UserService } from '../user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(signUpDto: SignUpDto) {
    // Check if the email is not already in use
    const checkEmail = await this.userService.find(signUpDto.email);

    if (checkEmail) {
      throw new ConflictException('Email is already in use');
    }

    // Hash the password in the database
    let passwordHash = await bcrypt.hash(signUpDto.password, 10);

    signUpDto.password = passwordHash;
    const user = await this.userService.create(signUpDto);
    return user;
  }

  async signIn(signInDto: SignInDto) {
    //check if user already have an account
    const checkUser = await this.userService.find(signInDto.email);

    if (!checkUser) {
      throw new NotFoundException('User not found, please signup');
    }

      //compaare stored password with input password
    
  }
}
