import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { CourseSchema } from '../../schemas/course.schema';
import { CourseRepository } from './course.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
    providers: [CourseRepository],
    exports: [CourseRepository]
})

export class CourseModule {}