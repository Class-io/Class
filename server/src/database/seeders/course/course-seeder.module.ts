import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { CoursesModule } from '../../../routes/course/courses.module';
import { CourseSeeder } from './course.seeder';

@Module({
    imports: [CommandModule, CoursesModule],
    providers: [CourseSeeder],
    exports: [CourseSeeder]
})

export class CourseSeederModule {}