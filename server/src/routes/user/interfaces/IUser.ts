import { Document } from 'mongoose';
import AccountType from '../../../common/constants/account-type';
import { IConfirmationCode } from './IConfirmationCode';

export interface IUser extends Document {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly joinedAt: number;
    readonly isConfirmed: boolean;
    readonly isTutor: boolean;
    readonly accountType: AccountType;
    readonly confirmationCode: IConfirmationCode;
}