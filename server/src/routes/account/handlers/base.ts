import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';

export class BaseAccountHandler {
    constructor(private readonly _usersSerivce: UsersService) {}

    private _throwExceptionWhenUserDoesNotExist(user: IUser | null): void {
        if(!user) throw new UserNotFoundException();
    }

    private _throwExceptionWhenAccountIsFromSocialMedia(user: IUser): void {
        if(user.accountType !== Constants.AccountType.REGULAR) throw new InvalidAccountTypeException();
    }

    private _throwExceptionWhenEmailIsAlreadyConfirmed(user: IUser): void {
        if(user.isConfirmed) throw new EmailAlreadyConfirmedException();
    }

    private _throwExceptionWhenEmailIsNotConfirmed(user: IUser): void {
        if(!user.isConfirmed) throw new EmailNotConfirmedException();
    }

    private _throwExceptionWhenConfirmationCodeIsInvalid(user: IUser, code: string): void {
        if(user.confirmationCode.code !== code) throw new InvalidConfirmationCodeException();
    }

    private _throwExceptionWhenConfirmationCodeIsExpired(user: IUser): void {
        if(Date.now() > user.confirmationCode.expiresAt) throw new ExpiredConfirmationCodeException();
    }
}