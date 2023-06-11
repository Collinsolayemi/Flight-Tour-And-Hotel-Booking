import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthService } from './Auth/service/auth-service';
import { AuthModule } from './Auth/module/auth-module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'travel_hotline',
      entities: [User],
      synchronize: true,
    }),
    UserModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
