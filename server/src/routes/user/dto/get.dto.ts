import { IConfirmationCode } from '../interfaces/IConfirmationCode';

export class GetUserDTO implements Readonly<GetUserDTO> {
    id: string;
    email: string;
    username: string;
    password: string;
    joinedAt: number;
    isConfirmed: boolean;
    isTutor: boolean;
    isSocialMediaAccount: boolean;
    confirmationCode: IConfirmationCode;
}