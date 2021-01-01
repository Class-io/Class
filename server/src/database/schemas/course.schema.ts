import { Schema } from 'mongoose';
import { Constants } from '../../common/constants';

export const UserSchema = new Schema({
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
            Constants.RATING.EMPTY, Constants.RATING.ONE_STAR,
            Constants.RATING.ONE_AND_HALF_STARS, Constants.RATING.TWO_STARS,
            Constants.RATING.TWO_AND_HALF_STARS, Constants.RATING.THREE_STARS,
            Constants.RATING.THREE_AND_HALF_STARS, Constants.RATING.FOUR_STARS,
            Constants.RATING.FOUR_AND_HALF_STARS, Constants.RATING.FIVE_STARS
        ],
        default: Constants.RATING.EMPTY
    },
    reviewsNumber: {
        type: Number,
        default: 0
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
    }
});