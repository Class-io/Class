import AccountType from '../../../common/constants/account-type';
import { IConfirmationCode } from '../interfaces/IConfirmationCode';

export class GetUserDTO implements Readonly<GetUserDTO> {
    _id?: string;
    email?: string;
    username?: string;
    joinedAt?: number;
    isConfirmed?: boolean;
    isTutor?: boolean;
    accountType?: AccountType;
    confirmationCode?: IConfirmationCode;
}