"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const mail_service_1 = require("./email/mail-service");
dotenv.config();
const otp_entity_1 = require("../entities/otp.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService, otpRepository, userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
    }
    generateOtp() {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        return code;
    }
    async generateToken(args) {
        const payLoad = args;
        return this.jwtService.signAsync(payLoad, {
            secret: process.env.JWT_SECRET,
        });
    }
    async signup(signUpDto) {
        const user = await this.userRepository.findOne({
            where: { email: signUpDto.email },
        });
        const checkPhoneNumber = await this.userRepository.findOne({
            where: { phone_number: signUpDto.phone_number },
        });
        if (user) {
            throw new common_1.ConflictException('This email is assign to a customer account, please log in');
        }
        else if (checkPhoneNumber) {
            throw new common_1.ConflictException('This phone number is assign to a customer account');
        }
        if (signUpDto.password !== signUpDto.confirm_password) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const generatedOtp = this.generateOtp();
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
        let passwordHash = await bcrypt.hash(signUpDto.password, 10);
        signUpDto.password = passwordHash;
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
      If you encounter any difficulties during the account activation process or have any questions, feel free to reach out to our friendly support team at <h1>support@travelhotline.info. We're here to assist you every step of the way.\n\n
      We hope you have an incredible journey with Travel Hotline and create unforgettable memories around the world. Happy travels!\n\nBest regards,\n\nThe Travel Hotline Team`,
        });
        if (!emailSent) {
            throw new common_1.InternalServerErrorException('An error occurred while sending the otp verification  email. Please try again or contact support.');
        }
        return { message: 'Email sent successfully' };
    }
    async verifySignUpOtp(verifyOtp) {
        const user = await this.otpRepository.findOne({
            where: { signUpOtp: verifyOtp.otp },
        });
        if (!user)
            throw new common_1.BadRequestException('Invalid OTP');
        const currentDateTime = new Date();
        if (user.expiredAt < currentDateTime) {
            const newOtp = this.generateOtp();
            const newExpiration = new Date();
            newExpiration.setMinutes(newExpiration.getMinutes() + 10);
            await this.otpRepository.delete(user.id);
            const createOtp = await this.otpRepository.create({
                signUpOtp: newOtp,
                email: user.email,
                expiredAt: newExpiration,
                userId: user.id,
            });
            user.signUpOtp = newOtp;
            user.expiredAt = newExpiration;
            await this.otpRepository.save(createOtp);
            throw new common_1.BadRequestException('OTP has expired, check your email for another OTP');
        }
        await this.otpRepository.delete(user.id);
        return {
            message: 'congratulation your otp have been verified, you can now change your password',
        };
    }
    async signIn(signInDto) {
        const user = await this.userRepository.findOne({
            where: { username: signInDto.username },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found, please signup');
        }
        const compaarePassword = await bcrypt.compare(signInDto.password, user.password);
        if (!compaarePassword) {
            throw new common_1.NotFoundException('Password incorrect , please retype your password');
        }
        const token = await this.generateToken({
            id: user.id,
            email: user.email,
        });
        return { access_token: token, user };
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.userRepository.findOne({
            where: { email: forgotPasswordDto.email },
        });
        if (!user) {
            throw new common_1.BadRequestException(`The email ${forgotPasswordDto.email} could not be found. Please try again or contact support.`);
        }
        const generatedOtp = await this.generateOtp();
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
        const createOtp = await this.otpRepository.create({
            userId: user.id,
            email: user.email,
            expiredAt: otpExpiration,
            forgetPasswordOtp: generatedOtp,
        });
        const saveOtp = await this.otpRepository.save(createOtp);
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
            throw new common_1.InternalServerErrorException('An error occurred while sending the password reset email. Please try again or contact support.');
        }
        return {
            message: 'check your email for an OTP for verification ',
            email: forgotPasswordDto.email,
        };
    }
    async image(image) {
        const upload = await this.cloudinary.uploadImage(image);
        return upload;
    }
    async verifyForgetPasswordOtp(verifyOtp) {
        const user = await this.otpRepository.findOne({
            where: { forgetPasswordOtp: verifyOtp.otp },
        });
        console.log(user);
        if (!user)
            throw new common_1.BadRequestException('Invalid OTP');
        const currentDateTime = new Date();
        if (user.expiredAt < currentDateTime) {
            const newOtp = this.generateOtp().toString();
            const newExpiration = new Date();
            newExpiration.setMinutes(newExpiration.getMinutes() + 1);
            await this.otpRepository.delete(user.id);
            const createOtp = this.otpRepository.create({
                signUpOtp: newOtp,
                email: user.email,
                expiredAt: newExpiration,
            });
            user.signUpOtp = newOtp;
            user.expiredAt = newExpiration;
            await this.otpRepository.save(createOtp);
            throw new common_1.BadRequestException('OTP has expired, check your email for another OTP');
        }
        const getUser = await this.userRepository.findOne({
            where: { email: user.email },
        });
        await this.otpRepository.delete(user.id);
        await this.userRepository.save(getUser);
        return { message: 'congratulation your OTP verification was successful ' };
    }
    async resetPassword(resetPasswordDto) {
        const { password, confirmPassword, email } = resetPasswordDto;
        if (password !== confirmPassword)
            throw new common_1.BadRequestException('password does not match');
        const user = await this.userRepository.findOne({ where: { email } });
        const passwordHash = await bcrypt.hash(password, 10);
        user.password = passwordHash;
        await this.userRepository.save(user);
        return { message: 'Password reset successful' };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map