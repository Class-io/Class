import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { UsersModule } from '../../../routes/user/users.module';
import { UserSeeder } from "./user.seeder";

@Module({
    imports: [CommandModule, UsersModule],
    providers: [UserSeeder],
    exports: [UserSeeder]
})

export class UserSeederModule {}