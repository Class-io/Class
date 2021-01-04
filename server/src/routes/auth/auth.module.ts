import { Module } from "@nestjs/common";
import { UserModelModule } from '../../database/models/user/user.model.module';
import { JwtModule } from "../../services/jwt/jwt.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UserModelModule, JwtModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {}