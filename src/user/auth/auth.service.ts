// import {
//   Injectable,
//   ConflictException,
//   BadRequestException,
//   NotFoundException,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { ForgotPasswordDto, SignInDto, SignUpDto } from './dto/auth-dto';
// import { UserService } from '../user.service';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import * as dotenv from 'dotenv';
// import { check } from 'prettier';
// dotenv.config();

// @Injectable()
// export class AuthService {
//   mailService: any;
//   clientAppUrl: any;
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService,
//   ) {}

//   async generateToken(args: { id: number; email: string }): Promise<String> {
//     const payLoad = args;

//     return this.jwtService.signAsync(payLoad, {
//       secret: process.env.JWT_SECRET,
//     });
//   }
//   async signup(signUpDto: SignUpDto) {
//     // Check if the email is not already in use
//     const checkEmail = await this.userService.findByEmail(signUpDto.email);

//     if (checkEmail) {
//       throw new ConflictException('Email is already in use');
//     }
//     if (signUpDto.password !== signUpDto.confirm_password) {
//       throw new BadRequestException('Passwords do not match');
//     }

//     // Hash the password in the database
//     let passwordHash = await bcrypt.hash(signUpDto.password, 10);

//     signUpDto.password = passwordHash;
//     const user = await this.userService.create(signUpDto);
//     return user;
//   }

//   async signIn(signInDto: SignInDto) {
//     //check if user already have an account
//     const checkUser = await this.userService.findByUsername(signInDto.username);

//     if (!checkUser) {
//       throw new NotFoundException('User not found, please signup');
//     }

//     //compaare stored password with input password
//     const compaarePassword = await bcrypt.compare(
//       signInDto.password,
//       checkUser.password,
//     );

//     if (!compaarePassword) {
//       throw new NotFoundException(
//         'Password incorrect , please retype your password',
//       );
//     }

//     //generate token for a user when they signIn
//     const token = await this.generateToken({
//       id: checkUser.id,
//       email: checkUser.username,
//     });
//     //Excluding the password field from the response body
//     const { password: pass, ...others } = checkUser;
//     return { token, ...others };
//   }

//   async forgotPassword(ForgotPasswordDto: ForgotPasswordDto) {
//     //check if the email is a registered email address
//     const checkEmail = await this.userService.findByEmail(
//       ForgotPasswordDto.email,
//     );

//     if (!checkEmail) {
//       throw new BadRequestException(
//         `The email address ${ForgotPasswordDto.email} could not be found. Please try again or contact support.`,
//       );
//     }

//     // Generate a signed JSON web token containing the user ID and email.
//     const token = await this.jwtService.signAsync({
//       id: checkEmail.id,
//       email: checkEmail.email,
//     });

//     const resetLink = `${this.clientAppUrl}/auth/reset-password?token=${token}`;

//     // Send a password reset email to the user.
//     const emailSent = await this.mailService.send({
//         to: checkEmail.email,
//         subject: "Reset your password",
//         text: `Hi ${checkEmail.username},\n\nPlease click on the following link to reset your password:\n\n ${resetLink}\n\n If you didn't request a password reset, please ignore this email.`,
//     });

//     if (!emailSent) {
//         // There was an error sending the email
//         throw new InternalServerErrorException(
//             "An error occurred while sending the password reset email. Please try again or contact support."
//         );
//     }
// }

// }

import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ForgotPasswordDto, SignInDto, SignUpDto } from './dto/auth-dto';
import { UserService } from '../user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { MailService } from './email/mail-service';
dotenv.config();

@Injectable()
export class AuthService {
  clientAppUrl: string;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async generateToken(args: { id: number; email: string }): Promise<string> {
    const payLoad = args;

    return this.jwtService.signAsync(payLoad, {
      secret: process.env.JWT_SECRET,
    });
  }

  async signup(signUpDto: SignUpDto) {
    // Check if the email is not already in use
    const checkEmail = await this.userService.findByEmail(signUpDto.email);

    if (checkEmail) {
      throw new ConflictException('Email is already in use');
    }
    if (signUpDto.password !== signUpDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    // Hash the password in the database
    let passwordHash = await bcrypt.hash(signUpDto.password, 10);

    signUpDto.password = passwordHash;

    const user = await this.userService.create(signUpDto);
    return user;
  }

  async signIn(signInDto: SignInDto) {
    //check if user already have an account
    const checkUser = await this.userService.findByUsername(signInDto.username);

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

  async forgotPassword(ForgotPasswordDto: ForgotPasswordDto) {
    //check if the email is a registered email address
    const checkEmail = await this.userService.findByEmail(
      ForgotPasswordDto.email,
    );

    if (!checkEmail) {
      throw new BadRequestException(
        `The email address ${ForgotPasswordDto.email} could not be found. Please try again or contact support.`,
      );
    }

    // Generate a signed JSON web token containing the user ID and email.
    //   try {

    const token = await this.generateToken({
      id: checkEmail.id,
      email: checkEmail.email,
    });

    const clientAppUrl = `https://localhost:3010`;
    const resetLink = `${clientAppUrl}/auth/reset-password?token=${token}`;

    // Send a password reset email to the user.
    const emailSent = await this.mailService.send({
      to: checkEmail.email,
      subject: 'Reset your password',
      text: `Hi ${checkEmail.username},\n\nPlease click on the following link to reset your password:\n\n ${resetLink}\n\n If you didn't request a password reset, please ignore this email.`,
    });

      if (!emailSent) {
        // There was an error sending the email
        throw new InternalServerErrorException(
          'An error occurred while sending the password reset email. Please try again or contact support.',
        );
      }
    }
    catch(e) {
      throw new Error('Error while sending email' + e);
  }
}
