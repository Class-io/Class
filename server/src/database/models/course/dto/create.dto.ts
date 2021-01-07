import { Course } from '../../../../common/constants/course';

export class CreateCourseDTO implements Readonly<CreateCourseDTO> {
    authorId: string;
    authorName: string;
    name: string;
    price: number;
    topic: Course.TOPIC;
    level: Course.LEVEL;
    description: string;
    duration: number;
    image: string;
}