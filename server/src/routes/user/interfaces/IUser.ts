import { Document } from 'mongoose';
import { IConfirmationCode } from './IConfirmationCode';

export interface IUser extends Document {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly isTutor: boolean;
    readonly isSocialMediaAccount: boolean;
    readonly confirmationCode: IConfirmationCode;
}