"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const otp_entity_1 = require("../entities/otp.entity");
const typeorm_1 = require("@nestjs/typeorm");
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
        // Generate a random 4-digit OTP
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        return code;
    }
    generateToken(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const payLoad = args;
            return this.jwtService.signAsync(payLoad, {
                secret: process.env.JWT_SECRET,
            });
        });
    }
    signup(signUpDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the email is not already in use
            const user = yield this.userRepository.findOne({
                where: { email: signUpDto.email },
            });
            //check if phone number is already in use
            const checkPhoneNumber = yield this.userRepository.findOne({
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
            //upload the profile picture to cloudinary
            // const upload = await this.cloudinary.uploadImage(signUpDto.profile_picture);
            // Generate a verification otpRepository
            const generatedOtp = this.generateOtp();
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
            //hash the password
            let passwordHash = yield bcrypt.hash(signUpDto.password, 10);
            signUpDto.password = passwordHash;
            //const newUser = await this.userService.create(signUpDto);
            const newUser = yield this.userRepository.create({
                email: signUpDto.email,
                password: signUpDto.password,
                phone_number: signUpDto.phone_number,
                username: signUpDto.username,
                profile_picture: signUpDto.profile_picture,
                birthday: signUpDto.birthday,
            });
            const saveNewUser = yield this.userRepository.save(newUser);
            const otpEntity = yield this.otpRepository.create({
                email: newUser.email,
                userId: newUser.id,
                signUpOtp: generatedOtp,
                expiredAt: otpExpiration,
            });
            const saveOtp = yield this.otpRepository.save(otpEntity);
            // Send an otp to the user email address
            const emailSent = yield this.mailService.send({
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
                // There was an error sending the email
                throw new common_1.InternalServerErrorException('An error occurred while sending the otp verification  email. Please try again or contact support.');
            }
            return { message: 'Email sent successfully' };
        });
    }
    verifySignUpOtp(verifyOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.otpRepository.findOne({
                where: { signUpOtp: verifyOtp.otp },
            });
            if (!user)
                throw new common_1.BadRequestException('Invalid OTP');
            const currentDateTime = new Date();
            if (user.expiredAt < currentDateTime) {
                // OTP has expired, regenerate a new OTP
                const newOtp = this.generateOtp();
                const newExpiration = new Date();
                newExpiration.setMinutes(newExpiration.getMinutes() + 10);
                //delete the old otp from database
                yield this.otpRepository.delete(user.id);
                const createOtp = yield this.otpRepository.create({
                    signUpOtp: newOtp,
                    email: user.email,
                    expiredAt: newExpiration,
                    userId: user.id,
                });
                user.signUpOtp = newOtp;
                user.expiredAt = newExpiration;
                //save the new otp to the database
                yield this.otpRepository.save(createOtp);
                //return a message indicating otp is expired
                throw new common_1.BadRequestException('OTP has expired, check your email for another OTP');
            }
            //delete otp from database
            yield this.otpRepository.delete(user.id);
            return {
                message: 'congratulation your otp have been verified, you can now change your password',
            };
        });
    }
    signIn(signInDto) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if user already have an account
            const user = yield this.userRepository.findOne({
                where: { username: signInDto.username },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found, please signup');
            }
            //compaare stored password with input password
            const compaarePassword = yield bcrypt.compare(signInDto.password, user.password);
            if (!compaarePassword) {
                throw new common_1.NotFoundException('Password incorrect , please retype your password');
            }
            //generate token for a user when they signIn
            const token = yield this.generateToken({
                id: user.id,
                email: user.email,
            });
            return { access_token: token, user };
        });
    }
    forgotPassword(forgotPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if the email is a registered email address
            const user = yield this.userRepository.findOne({
                where: { email: forgotPasswordDto.email },
            });
            if (!user) {
                throw new common_1.BadRequestException(`The email ${forgotPasswordDto.email} could not be found. Please try again or contact support.`);
            }
            //const generatedOtp = randomBytes(4).toString('hex');
            const generatedOtp = yield this.generateOtp();
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
            const createOtp = yield this.otpRepository.create({
                userId: user.id,
                email: user.email,
                expiredAt: otpExpiration,
                forgetPasswordOtp: generatedOtp,
            });
            const saveOtp = yield this.otpRepository.save(createOtp);
            // Send a password reset otp to the user email address
            const emailSent = yield this.mailService.send({
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
                throw new common_1.InternalServerErrorException('An error occurred while sending the password reset email. Please try again or contact support.');
            }
            return {
                message: 'check your email for an OTP for verification ',
                email: forgotPasswordDto.email,
            };
        });
    }
    image(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const upload = yield this.cloudinary.uploadImage(image);
            return upload;
        });
    }
    verifyForgetPasswordOtp(verifyOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.otpRepository.findOne({
                where: { forgetPasswordOtp: verifyOtp.otp },
            });
            console.log(user);
            if (!user)
                throw new common_1.BadRequestException('Invalid OTP');
            const currentDateTime = new Date();
            if (user.expiredAt < currentDateTime) {
                // OTP has expired, regenerate a new OTP
                const newOtp = this.generateOtp().toString();
                const newExpiration = new Date();
                newExpiration.setMinutes(newExpiration.getMinutes() + 1);
                //delete the old otp from database
                yield this.otpRepository.delete(user.id);
                const createOtp = this.otpRepository.create({
                    signUpOtp: newOtp,
                    email: user.email,
                    expiredAt: newExpiration,
                });
                user.signUpOtp = newOtp;
                user.expiredAt = newExpiration;
                //save the new otp to the database
                yield this.otpRepository.save(createOtp);
                //return a message indicating otp is expired
                throw new common_1.BadRequestException('OTP has expired, check your email for another OTP');
            }
            const getUser = yield this.userRepository.findOne({
                where: { email: user.email },
            });
            //delete the old otp from database
            yield this.otpRepository.delete(user.id);
            yield this.userRepository.save(getUser);
            return { message: 'congratulation your OTP verification was successful ' };
        });
    }
    resetPassword(resetPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, confirmPassword, email } = resetPasswordDto;
            if (password !== confirmPassword)
                throw new common_1.BadRequestException('password does not match');
            // Retrieve the user from the token
            const user = yield this.userRepository.findOne({ where: { email } });
            // Hash the new password
            const passwordHash = yield bcrypt.hash(password, 10);
            // Update the user's password
            user.password = passwordHash;
            // Save the updated user to the database using the UserRepository
            yield this.userRepository.save(user);
            return { message: 'Password reset successful' };
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User))
], AuthService);
exports.AuthService = AuthService;
