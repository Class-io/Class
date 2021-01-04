import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { UserModelModule } from '../../models/user/user.model.module';
import { UserSeeder } from "./user.seeder";

@Module({
    imports: [CommandModule, UserModelModule],
    providers: [UserSeeder],
    exports: [UserSeeder]
})

export class UserSeederModule {}