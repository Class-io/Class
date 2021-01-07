import { Course } from '../../../../common/constants/course';

export class UpdateCourseDTO implements Readonly<UpdateCourseDTO> {
    authorName?: string;
    name?: string;
    price?: number;
    rating?: Course.RATING;
    topic?: Course.TOPIC;
    level?: Course.LEVEL;
    reviewsNumber?: number;
    description?: string;
    duration?: number;
    image?: string;
    updatedAt?: number;
}