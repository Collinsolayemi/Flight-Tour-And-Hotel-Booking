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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth-dto");
const auth_guard_1 = require("./guards/auth-guard");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const response_message_decorator_1 = require("../../decorator/response-message.decorator");
const dotenv = require("dotenv");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
dotenv.config;
let AuthController = class AuthController {
    constructor(authService, userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }
    async signUp(body) {
        return await this.authService.signup(body);
    }
    async uploadImagToCloudinary(file, req) {
        try {
            const imageUrl = await this.authService.cloudinary.uploadImage(file);
            return imageUrl;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error uploading picture');
        }
    }
    async verifySignupOtp(body) {
        const verifySignupOtp = await this.authService.verifySignUpOtp(body);
        return verifySignupOtp;
    }
    async signIn(body) {
        const signInResult = await this.authService.signIn(body);
        return signInResult;
    }
    async forgotPassword(body) {
        const byEmail = await this.authService.forgotPassword(body);
        return byEmail;
    }
    async verifyForgotPasswordOtp(body) {
        const verify = await this.authService.verifyForgetPasswordOtp(body);
        return verify;
    }
    async resetPassword(body) {
        const resetPassword = await this.authService.resetPassword(body);
        return resetPassword;
    }
    async getUserProfile(req) {
        const user = req.user.email;
        const getUser = await this.userRepository.findOne({
            where: { email: user },
        });
        return getUser;
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    (0, response_message_decorator_1.ResponseMessage)('signup successful'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('/upload/identification'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadImagToCloudinary", null);
__decorate([
    (0, common_1.Post)('verify-signup-otp'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifySignUpOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifySignupOtp", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('verify-forgot-password-otp'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.VerifyForgetPasswordOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserProfile", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_2.Repository])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map