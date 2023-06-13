import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SignUpDto } from './dto/auth-dto';
import { UserService } from '../user.service';

// @Injectable()
// export class AuthService {
//   constructor(private readonly userService: UserService) {}

//   async signup(signUpDto : SignUpDto) {
//     // Check if the email is not already in use
//     const checkEmail = await this.userService.find({ where: { email: signUpDto.email }});

//     if (checkEmail) {
//       throw new ConflictException('Email is already in use');
//     }

//     const user = await this.userService.create(signUpDto);
//     return user
//   }
// }

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signUpDto: SignUpDto) {
    // Check if the email is not already in use
    const checkEmail = await this.userService.find(signUpDto.email);
  
    if (checkEmail) {
      throw new ConflictException('Email is already in use');
    }

    const user = await this.userService.create(signUpDto);
    return user;
  }
}
