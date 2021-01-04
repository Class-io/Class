import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { CoursesModule } from '../../models/course/course.module';
import { UserModule } from '../../models/user/user.module';
import { CourseSeeder } from './course.seeder';

@Module({
    imports: [CommandModule, CoursesModule, UserModule],
    providers: [CourseSeeder],
    exports: [CourseSeeder]
})

export class CourseSeederModule {}