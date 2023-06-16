import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
import { JwtModule } from '@nestjs/jwt';
import { TwilioModule } from 'nestjs-twilio';
import { TwilioService } from './user/auth/twillo/twilio-service';

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: process.env.SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: '',
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, TwilioService],
})
  
export class AppModule {}
