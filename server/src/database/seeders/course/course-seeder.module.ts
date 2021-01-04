import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { CourseModule } from '../../models/course/course.module';
import { UserModule } from '../../models/user/user.module';
import { CourseSeeder } from './course.seeder';

@Module({
    imports: [CommandModule, CourseModule, UserModule],
    providers: [CourseSeeder],
    exports: [CourseSeeder]
})

export class CourseSeederModule {}