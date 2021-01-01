import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { CoursesModule } from '../../../routes/course/courses.module';
import { UsersModule } from '../../../routes/user/users.module';
import { CourseSeeder } from './course.seeder';

@Module({
    imports: [CommandModule, CoursesModule, UsersModule],
    providers: [CourseSeeder],
    exports: [CourseSeeder]
})

export class CourseSeederModule {}