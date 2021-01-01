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
        
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
});