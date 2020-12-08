import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import config from "../config";
import { UsersModule } from "../models/user/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: config.AUTH.SECRET,
        signOptions: { expiresIn: '24h' }
    })],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {}