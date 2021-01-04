import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { CourseSchema } from '../../schemas/course.schema';
import { CoursesService } from './course.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
    providers: [CoursesService],
    exports: [CoursesService]
})

export class CoursesModule {}