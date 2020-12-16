import { Module } from "@nestjs/common";
import { UsersModule } from "../user/users.module";
import { AccountService } from './account.service';

@Module({
    imports: [UsersModule],
    providers: [AccountService],
    exports: [AccountService]
})

export class AccountModule {}