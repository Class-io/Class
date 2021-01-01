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
    rating: {
        type: Number,
        enum: [
            Constants.COURSE_RATING.EMPTY, Constants.COURSE_RATING.ONE_STAR,
            Constants.COURSE_RATING.ONE_AND_HALF_STARS, Constants.COURSE_RATING.TWO_STARS,
            Constants.COURSE_RATING.TWO_AND_HALF_STARS, Constants.COURSE_RATING.THREE_STARS,
            Constants.COURSE_RATING.THREE_AND_HALF_STARS, Constants.COURSE_RATING.FOUR_STARS,
            Constants.COURSE_RATING.FOUR_AND_HALF_STARS, Constants.COURSE_RATING.FIVE_STARS
        ],
        default: Constants.COURSE_RATING.EMPTY
    },
    reviewsNumber: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        enum: [
            Constants.COURSE_LEVEL.BEGINNER,
            Constants.COURSE_LEVEL.INTERMEDIATE,
            Constants.COURSE_LEVEL.ADVANCED
        ],
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
    }
});