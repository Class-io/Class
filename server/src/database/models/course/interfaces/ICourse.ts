import { Document } from 'mongoose';
import { Course } from '../../../../common/constants/course';

export interface ICourse extends Document {
    readonly id: string;
    readonly authorId: string;
    readonly authorName: string;
    readonly name: string;
    readonly price: number;
    readonly rating: Course.RATING;
    readonly topic: Course.TOPIC;
    readonly level: Course.LEVEL;
    readonly reviewsNumber: number;
    readonly description: string;
    readonly duration: number;
    readonly image: string;
    readonly createdAt: number;
    readonly updatedAt: number;
}