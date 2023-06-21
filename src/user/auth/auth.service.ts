import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  VerifyForgetPasswordOtpDto,
  VerifySignUpOtpDto,
} from './dto/auth-dto';
import { UserService } from '../user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { MailService } from './email/mail-service';
import { TwilioService } from './twillo/twilio-service';
import { randomBytes, sign } from 'crypto';
dotenv.config();
import { Otp } from '../entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { generate } from 'rxjs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class AuthService {
  clientAppUrl: string;
  cloudinary: any;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //function to generate otp
  generateOtp(): string {
    const otpLength = 6;
    const otpChars = '0123456789';
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
      const randomIndex = Math.floor(Math.random() * otpChars.length);
      otp += otpChars[randomIndex];
    }
    return otp;
  }

  async generateToken(args: { id: string; email: string }): Promise<string> {
    const payLoad = args;

    return this.jwtService.signAsync(payLoad, {
      secret: process.env.JWT_SECRET,
    });
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/upload/identification')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImagToCloudinary(@UploadedFile() file, @Req() req: Request) {
    try {
      const upload = await this.cloudinary.uploadImage(file);

      return 
    } catch (error) {
      throw new BadRequestException('Error uploading Identification');
    }
  }

  async signup(signUpDto: SignUpDto) {
    // Check if the email is not already in use
    const user = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });

    //check if phone number is already in use
    const checkPhoneNumber = await this.userRepository.findOne({
      where: { phone_number: signUpDto.phone_number },
    });

    if (user) {
      throw new ConflictException(
        'This email is assign to a customer account, please log in',
      );
    } else if (checkPhoneNumber) {
      throw new ConflictException(
        'This phone number is assign to a customer account',
      );
    }
    if (signUpDto.password !== signUpDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    //upload the profile picture to cloudinary
    // const upload = await this.cloudinary.uploadImage(signUpDto.profile_picture);
   

    // Generate a verification otpRepository
    const generatedOtp = this.generateOtp();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);

    //hash the password
    let passwordHash = await bcrypt.hash(signUpDto.password, 10);
    signUpDto.password = passwordHash;

    //hash the otp in the DB
    //const otpHash = await bcrypt.hash(generatedOtp, 10);

    //const newUser = await this.userService.create(signUpDto);
    const newUser = await this.userRepository.create({
      email: signUpDto.email,
      password: signUpDto.password,
      phone_number: signUpDto.phone_number,
      username: signUpDto.username,
      profile_picture: signUpDto.profile_picture,
      birthday: signUpDto.birthday,
    });

    const saveNewUser = await this.userRepository.save(newUser);

    const otpEntity = await this.otpRepository.create({
      email: newUser.email,
      userId: newUser.id,
      signUpOtp: generatedOtp,
      expiredAt: otpExpiration,
    });

    const saveOtp = await this.otpRepository.save(otpEntity);

    // Send an otp to the user email address
    const emailSent = await this.mailService.send({
      to: signUpDto.email,
      subject: 'Welcome to Travel Hotline - Activate Your Account',
      text: `Dear ${signUpDto.username},\n\nCongratulations and welcome to Travel Hotline! We're thrilled to have you as a new member of our travel community. This email contains the OTP Code you need to activate your account and start exploring the world of travel with us.
      \n\nTo activate your Travel Hotline account, please utilize this OTP Code:
      \n\nOTP Code: ${generatedOtp}
      \n\n Please note that the OTP code is valid for a limited time period for security purposes. If the code expires, you can request a new one by visiting the account activation page and clicking on the "Resend OTP" option.
      \n\n Once you have successfully entered the OTP code, you will gain full access to your Travel Hotline account and be able to:
      \n\n 
      - Discover exciting travel destinations.
      - Search and book all travel accommodations.
      - Access exclusive deals and discounts.
      - Create personalized itineraries and save your favorite travel options.
      - Connect with fellow travelers and share experiences on the Travel Hotline Network.\n\n
      If you encounter any difficulties during the account activation process or have any questions, feel free to reach out to our friendly support team at support@travelhotline.info. We're here to assist you every step of the way.\n\n
      We hope you have an incredible journey with Travel Hotline and create unforgettable memories around the world. Happy travels!\n\nBest regards,\n\nThe Travel Hotline Team`,
    });

    if (!emailSent) {
      // There was an error sending the email
      throw new InternalServerErrorException(
        'An error occurred while sending the otp verification  email. Please try again or contact support.',
      );
    }

    return { message: 'Email sent successfully' };
  }

  async verifySignUpOtp(verifyOtp: VerifySignUpOtpDto) {
    const userOtp = await this.otpRepository.findOne({
      where: { signUpOtp: verifyOtp.otp },
    });

    if (!userOtp) throw new BadRequestException('Invalid OTP');

    const currentDateTime = new Date();

    if (userOtp.expiredAt < currentDateTime) {
      // OTP has expired, regenerate a new OTP
      const newOtp = this.generateOtp();
      const newExpiration = new Date();
      newExpiration.setMinutes(newExpiration.getMinutes() + 10);

      //delete the old otp from database
      await this.otpRepository.delete(userOtp.id);

      const createOtp = await this.otpRepository.create({
        signUpOtp: newOtp,
        email: userOtp.email,
        expiredAt: newExpiration,
        userId: userOtp.id,
      });
      userOtp.signUpOtp = newOtp;
      userOtp.expiredAt = newExpiration;
      //save the new otp to the database
      await this.otpRepository.save(createOtp);

      //return a message indicating otp is expired
      throw new BadRequestException(
        'OTP has expired, check your email for another OTP',
      );
    }
    //delete otp from database
    await this.otpRepository.delete(userOtp.id);

    return {
      message:
        'congratulation your otp have been verified, you can now change your password',
    };
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
    return { token };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    //check if the email is a registered email address
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (!user) {
      throw new BadRequestException(
        `The email ${forgotPasswordDto.email} could not be found. Please try again or contact support.`,
      );
    }

    const generatedOtp = randomBytes(4).toString('hex');
    // const generatedOtp =  = await this.generateOtp();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);

    const createOtp = await this.otpRepository.create({
      userId: user.id,
      email: user.email,
      expiredAt: otpExpiration,
      forgetPasswordOtp: generatedOtp,
    });

    const saveOtp = await this.otpRepository.save(createOtp);

    // Send a password reset otp to the user email address
    const emailSent = await this.mailService.send({
      to: user.email,
      subject: 'Reset Password ',
      text: `Dear ${user.username},\n\nWe have received a request to reset the password for your Travel Hotline account. To ensure the security of your account, we have generated a unique verification code for you to use.\n\nPlease find your verification code below:
      \n\nVerification Code:
     ${generatedOtp}\n\n If you did not initiate this password reset request, please disregard this email and ensure the security of your account by keeping your credentials confidential.
     \n\n
     For any further assistance or questions, please do not hesitate to contact our support team at support@travelhotline.info
     \n\nThank you for using the Travel Hotline. \n\nBest regards,\n\nTravel Hotline Team
     `,
    });

    if (!emailSent) {
      // There was an error sending the email
      throw new InternalServerErrorException(
        'An error occurred while sending the password reset email. Please try again or contact support.',
      );
    }

    return { email: forgotPasswordDto.email };
  }

  async image(image: any) {
    const upload = await this.cloudinary.uploadImage(image);
    return upload
  }

  async verifyForgetPasswordOtp(verifyOtp: VerifyForgetPasswordOtpDto) {
    const userOtp = await this.otpRepository.findOne({
      where: { forgetPasswordOtp: verifyOtp.otp },
    });

    if (!userOtp) throw new BadRequestException('Invalid OTP');

    const currentDateTime = new Date();

    if (userOtp.expiredAt < currentDateTime) {
      // OTP has expired, regenerate a new OTP
      const newOtp = this.generateOtp();
      const newExpiration = new Date();
      newExpiration.setMinutes(newExpiration.getMinutes() + 1);

      //delete the old otp from database
      await this.otpRepository.delete(userOtp.id);

      const createOtp = await this.otpRepository.create({
        signUpOtp: newOtp,
        email: userOtp.email,
        expiredAt: newExpiration,
      });
      userOtp.signUpOtp = newOtp;
      userOtp.expiredAt = newExpiration;
      //save the new otp to the database
      await this.otpRepository.save(createOtp);

      //return a message indicating otp is expired
      throw new BadRequestException(
        'OTP has expired, check your email for another OTP',
      );
    }

    const getUser = await this.userRepository.findOne({
      where: { email: userOtp.email },
    });

    //delete the old otp from database
    await this.otpRepository.delete(userOtp.id);
    await this.userRepository.save(getUser);

    console.log(getUser);

    return { message: 'congratulation your OTP verification was successful ' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, confirmPassword, email } = resetPasswordDto;

    if (password !== confirmPassword)
      throw new BadRequestException('password does not match');

    // Retrieve the user from the token
    const user = await this.userRepository.findOne({ where: { email } });

    // Hash the new password
    const passwordHash = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = passwordHash;

    // Save the updated user to the database using the UserRepository
    await this.userRepository.save(user);

    return { message: 'Password reset successful' };
  }
}
