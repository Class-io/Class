import { Schema } from 'mongoose';
import { Constants } from '../../common/constants';

export const UserSchema = new Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String,
        default: ''
    },
    joinedAt: {
        type: Number,
        default: Date.now()
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    isTutor: {
        type: Boolean,
        default: false
    },
    accountType: {
        type: String,
        enum: [
            Constants.ACCOUNT_TYPE.REGULAR,
            Constants.ACCOUNT_TYPE.GOOGLE,
            Constants.ACCOUNT_TYPE.GITHUB
        ],
        default: Constants.ACCOUNT_TYPE.REGULAR
    },
    confirmationCode: {
        code: {
            type: String,
            default: ''
        },
        expiresAt: {
            type: Number,
            default: Date.now()
        }
    },
    courses: {
        type: [String],
        default: []
    },
    avatar: {
        type: String,
        default: 'avatars/default.jpg'
    }
});