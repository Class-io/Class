import { CourseLevel } from '../../../../common/constants/course-level';
import { CourseTopic } from '../../../../common/constants/course-topic';

export class CreateCourseDTO implements Readonly<CreateCourseDTO> {
    authorId: string;
    authorName: string;
    name: string;
    price: number;
    topic: CourseTopic;
    level: CourseLevel;
    description: string;
    duration: number;
    image: string;
}