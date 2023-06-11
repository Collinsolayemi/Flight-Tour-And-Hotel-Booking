import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { AuthController } from "../controller/auth-controller";
import { AuthService } from "../service/auth-service";




@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
  })
  export class AuthModule {}
  