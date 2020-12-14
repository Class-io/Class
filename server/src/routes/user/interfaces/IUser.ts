import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly isTutor: boolean;
}