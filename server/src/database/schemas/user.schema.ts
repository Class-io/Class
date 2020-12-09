import { Schema } from 'mongoose';

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
    }
});