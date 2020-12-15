import { Module } from "@nestjs/common";
import { JwtModule } from "../../services/jwt/jwt.module";
import { MailModule } from '../../services/mail/mail.module';
import { UsersModule } from "../user/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UsersModule, JwtModule, MailModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {}