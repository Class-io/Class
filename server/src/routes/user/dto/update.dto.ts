import { IConfirmationCode } from '../interfaces/IConfirmationCode';

export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
    isConfirmed?: boolean;
    confirmationCode?: IConfirmationCode;
    password?: string;
}