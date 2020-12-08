import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    joinedAt: {
        type: Number,
        default: Date.now()
    },
    isConfirmed: {
        type: Boolean,
        default: false
    }
});