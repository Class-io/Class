import { Module } from "@nestjs/common";
import { UserModule } from '../../database/models/user/user.module';
import { JwtModule } from "../../providers/jwt/jwt.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UserModule, JwtModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {}