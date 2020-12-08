import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    joinedAt: Number,
    isConfirmed: Boolean
});