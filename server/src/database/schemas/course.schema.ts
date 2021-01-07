import { Schema } from 'mongoose';
import { Constants } from '../../common/constants';

export const CourseSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        enum: [
            Constants.COURSE.RATING.EMPTY, Constants.COURSE.RATING.ONE_STAR,
            Constants.COURSE.RATING.ONE_AND_HALF_STARS, Constants.COURSE.RATING.TWO_STARS,
            Constants.COURSE.RATING.TWO_AND_HALF_STARS, Constants.COURSE.RATING.THREE_STARS,
            Constants.COURSE.RATING.THREE_AND_HALF_STARS, Constants.COURSE.RATING.FOUR_STARS,
            Constants.COURSE.RATING.FOUR_AND_HALF_STARS, Constants.COURSE.RATING.FIVE_STARS
        ],
        default: Constants.COURSE.RATING.EMPTY
    },
    topic: {
        type: String,
        enum: [
            Constants.COURSE.TOPIC.JAVASCRIPT,
            Constants.COURSE.TOPIC.TYPESCRIPT
        ],
        required: true
    },
    level: {
        type: String,
        enum: [
            Constants.COURSE.LEVEL.BEGINNER,
            Constants.COURSE.LEVEL.INTERMEDIATE,
            Constants.COURSE.LEVEL.ADVANCED
        ],
        required: true
    },
    reviewsNumber: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    updatedAt: {
        type: Number,
        default: Date.now()
    },
});