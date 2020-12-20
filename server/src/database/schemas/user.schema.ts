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
        type: String
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
        enum: [Constants.AccountType.REGULAR, Constants.AccountType.GOOGLE, Constants.AccountType.GITHUB],
        default: Constants.AccountType.REGULAR
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
    }
});