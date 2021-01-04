import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { UsersModule } from '../../models/user/user.module';
import { UserSeeder } from "./user.seeder";

@Module({
    imports: [CommandModule, UsersModule],
    providers: [UserSeeder],
    exports: [UserSeeder]
})

export class UserSeederModule {}