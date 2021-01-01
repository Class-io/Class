import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { CourseSchema } from '../../database/schemas/course.schema';
import { CoursesService } from './courses.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
    providers: [CoursesService],
    exports: [CoursesService]
})

export class CoursesModule {}