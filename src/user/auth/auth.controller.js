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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./guards/auth-guard");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const response_message_decorator_1 = require("../../../../../../../src/decorator/response-message.decorator");
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
dotenv.config;
let AuthController = class AuthController {
    constructor(authService, userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }
    signUp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authService.signup(body);
        });
    }
    uploadImagToCloudinary(file, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageUrl = yield this.authService.cloudinary.uploadImage(file);
                return imageUrl;
            }
            catch (error) {
                throw new common_1.BadRequestException('Error uploading picture');
            }
        });
    }
    verifySignupOtp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifySignupOtp = yield this.authService.verifySignUpOtp(body);
            return verifySignupOtp;
        });
    }
    signIn(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const signInResult = yield this.authService.signIn(body);
            return signInResult;
        });
    }
    forgotPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const byEmail = yield this.authService.forgotPassword(body);
            return byEmail;
        });
    }
    verifyForgotPasswordOtp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify = yield this.authService.verifyForgetPasswordOtp(body);
            return verify;
        });
    }
    resetPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetPassword = yield this.authService.resetPassword(body);
            return resetPassword;
        });
    }
    getUserProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user.email;
            const getUser = yield this.userRepository.findOne({
                where: { email: user },
            });
            return getUser;
        });
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    (0, response_message_decorator_1.ResponseMessage)('signup successful'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)())
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('/upload/identification'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)())
], AuthController.prototype, "uploadImagToCloudinary", null);
__decorate([
    (0, common_1.Post)('verify-signup-otp'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)())
], AuthController.prototype, "verifySignupOtp", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)())
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe()))
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('verify-forgot-password-otp'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)())
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)())
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Req)())
], AuthController.prototype, "getUserProfile", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User))
], AuthController);
exports.AuthController = AuthController;
