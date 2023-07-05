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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifySignUpOtpDto = exports.VerifyForgetPasswordOtpDto = exports.ForgotPasswordDto = exports.ResetPasswordDto = exports.SignInDto = exports.SignUpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignUpDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'username' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20, { message: 'password must be between 3 and 20 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 20, { message: 'password must be between 3 and 20 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "confirm_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], SignUpDto.prototype, "profile_picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '08154640543' }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsPhoneNumber)('NG'),
    __metadata("design:type", String)
], SignUpDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({ type: Date, format: 'date' }),
    __metadata("design:type", Date)
], SignUpDto.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SignUpDto.prototype, "otpExpire", void 0);
exports.SignUpDto = SignUpDto;
class SignInDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name@example.com' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username cannot be empty' }),
    __metadata("design:type", String)
], SignInDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password' }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.Length)(3, 20, { message: 'Password must be between 3 and 20 characters' }),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
exports.SignInDto = SignInDto;
class ResetPasswordDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
exports.ResetPasswordDto = ResetPasswordDto;
class ForgotPasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
exports.ForgotPasswordDto = ForgotPasswordDto;
class VerifyForgetPasswordOtpDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyForgetPasswordOtpDto.prototype, "otp", void 0);
exports.VerifyForgetPasswordOtpDto = VerifyForgetPasswordOtpDto;
class VerifySignUpOtpDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifySignUpOtpDto.prototype, "otp", void 0);
exports.VerifySignUpOtpDto = VerifySignUpOtpDto;
//# sourceMappingURL=auth-dto.js.map