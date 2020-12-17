import { IConfirmationCode } from '../interfaces/IConfirmationCode';

export class GetUserDTO implements Readonly<GetUserDTO> {
    _id?: string;
    email?: string;
    username?: string;
    joinedAt?: number;
    isConfirmed?: boolean;
    isTutor?: boolean;
    isSocialMediaAccount?: boolean;
    confirmationCode?: IConfirmationCode;
}