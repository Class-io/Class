import CourseLevel from '../../../../common/constants/course-level';
import CourseRating from '../../../../common/constants/course-rating';
import CourseTopic from '../../../../common/constants/course-topic';

export class UpdateCourseDTO implements Readonly<UpdateCourseDTO> {
    authorName?: string;
    name?: string;
    price?: number;
    rating?: CourseRating;
    topic?: CourseTopic;
    level?: CourseLevel;
    reviewsNumber?: number;
    description?: string;
    duration?: number;
    image?: string;
    updatedAt?: number;
}