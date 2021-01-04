import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { UserModule } from '../../models/user/user.module';
import { UserSeeder } from "./user.seeder";

@Module({
    imports: [CommandModule, UserModule],
    providers: [UserSeeder],
    exports: [UserSeeder]
})

export class UserSeederModule {}