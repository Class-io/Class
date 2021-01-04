import { Module } from "@nestjs/common";
import { UsersModule } from "../../database/models/user/user.module";
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { JwtModule } from '../../services/jwt/jwt.module';

@Module({
    imports: [UsersModule, JwtModule],
    providers: [AccountService],
    controllers: [AccountController],
    exports: [AccountService]
})

export class AccountModule {}