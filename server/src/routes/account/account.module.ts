import { Module } from "@nestjs/common";
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { JwtModule } from '../../services/jwt/jwt.module';
import { UserModule } from '../../database/models/user/user.module';

@Module({
    imports: [UserModule, JwtModule],
    providers: [AccountService],
    controllers: [AccountController],
    exports: [AccountService]
})

export class AccountModule {}