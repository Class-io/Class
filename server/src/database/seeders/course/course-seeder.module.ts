import { Module } from "@nestjs/common";
import { CommandModule } from "nestjs-command";
import { CourseModelModule } from '../../models/course/course.model.module';
import { UserModelModule } from '../../models/user/user.model.module';
import { CourseSeeder } from './course.seeder';

@Module({
    imports: [CommandModule, CourseModelModule, UserModelModule],
    providers: [CourseSeeder],
    exports: [CourseSeeder]
})

export class CourseSeederModule {}