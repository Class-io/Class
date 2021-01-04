import { Module } from "@nestjs/common";
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { JwtModule } from '../../services/jwt/jwt.module';
import { UserModelModule } from '../../database/models/user/user.model.module';

@Module({
    imports: [UserModelModule, JwtModule],
    providers: [AccountService],
    controllers: [AccountController],
    exports: [AccountService]
})

export class AccountModule {}