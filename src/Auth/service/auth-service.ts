import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { SignUpDto } from '../dto/sign-up-dto';

@Injectable()
export class AuthService {
    async signUp(data: SignUpDto) {
      //Check if the input email is in use  alre
        
        return 'signup succesfully'
  }
}
