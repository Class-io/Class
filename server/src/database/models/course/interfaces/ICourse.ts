import { Document } from 'mongoose';
import { CourseLevel } from '../../../../common/constants/course-level';
import { CourseRating } from '../../../../common/constants/course-rating';
import { CourseTopic } from '../../../../common/constants/course-topic';

export interface ICourse extends Document {
    readonly id: string;
    readonly authorId: string;
    readonly authorName: string;
    readonly name: string;
    readonly price: number;
    readonly rating: CourseRating;
    readonly topic: CourseTopic;
    readonly level: CourseLevel;
    readonly reviewsNumber: number;
    readonly description: string;
    readonly duration: number;
    readonly image: string;
    readonly createdAt: number;
    readonly updatedAt: number;
}