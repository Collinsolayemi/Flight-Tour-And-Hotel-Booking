"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(repo) {
        this.repo = repo;
    }
    create(signUpDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, phone_number, birthday, profile_picture, } = signUpDto;
            const newUser = new user_entity_1.User();
            newUser.email = email;
            newUser.username = username;
            newUser.password = password;
            newUser.birthday = new Date(birthday);
            newUser.phone_number = phone_number;
            newUser.profile_picture = profile_picture;
            const user = yield this.repo.create(newUser);
            return this.repo.save(user);
        });
    }
    findByEmail(email) {
        return this.repo.findOne({ where: { email } });
    }
    findByUsername(username) {
        return this.repo.findOne({ where: { username } });
    }
    findByPhoneNumber(phone_number) {
        return this.repo.findOne({ where: { phone_number } });
    }
    findAll() {
        return `This action returns all user`;
    }
    // findOne(id: number) {
    //   return `This action returns a #${id} user`;
    // }
    // update(id: number, updateUserDto: UpdateUserDto) {
    //   return `This action updates a #${id} user`;
    // }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repo.save(user);
            }
            catch (error) {
                throw new common_1.BadRequestException('Failed to update user');
            }
        });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    findByResetPasswordToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findOne({
                where: {
                    resetPasswordToken: token,
                },
            });
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User))
], UserService);
exports.UserService = UserService;
