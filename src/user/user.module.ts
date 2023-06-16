import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailService } from './auth/email/mail-service';
import * as dotenv from 'dotenv';
import { HttpModule } from '@nestjs/axios';
import { TwilioService } from './auth/twillo/twilio-service';

dotenv.config();

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, JwtService, MailService, TwilioService],
})
export class UserModule {}
