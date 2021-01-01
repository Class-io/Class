import { Constants } from '../../../common/constants';
import { EmailAlreadyConfirmedException } from '../../../common/exceptions/email-already-confirmed.exception';
import { EmailNotConfirmedException } from '../../../common/exceptions/email-not-confirmed.exception';
import { ExpiredConfirmationCodeException } from '../../../common/exceptions/expired-confirmation-code.exception';
import { InvalidAccountTypeException } from '../../../common/exceptions/invalid-account-type.exception';
import { InvalidConfirmationCodeException } from '../../../common/exceptions/invalid-confirmation-code.exception';
import { UserNotFoundException } from '../../../common/exceptions/user-not-found-exception';
import { hashString } from '../../../common/helpers/hash-string';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';

export class BaseAccountHandler {
    constructor(protected readonly _usersSerivce: UsersService) {}

    protected _throwExceptionWhenUserDoesNotExist(user: IUser | null): void {
        if(!user) throw new UserNotFoundException();
    }

    protected _throwExceptionWhenAccountIsFromSocialMedia(user: IUser): void {
        if(user.accountType !== Constants.ACCOUNT_TYPE.REGULAR) throw new InvalidAccountTypeException();
    }

    protected _throwExceptionWhenEmailIsAlreadyConfirmed(user: IUser): void {
        if(user.isConfirmed) throw new EmailAlreadyConfirmedException();
    }

    protected _throwExceptionWhenEmailIsNotConfirmed(user: IUser): void {
        if(!user.isConfirmed) throw new EmailNotConfirmedException();
    }

    protected _throwExceptionWhenConfirmationCodeIsInvalid(user: IUser, code: string): void {
        if(user.confirmationCode.code !== code) throw new InvalidConfirmationCodeException();
    }

    protected _throwExceptionWhenConfirmationCodeIsExpired(user: IUser): void {
        if(Date.now() > user.confirmationCode.expiresAt) throw new ExpiredConfirmationCodeException();
    }

    protected async _updatePasswordInDatabase(id: string, password: string): Promise<void> {
        const hashedPassword = await hashString(password);
        await this._usersSerivce.updateById(id, { password: hashedPassword });
    }
}