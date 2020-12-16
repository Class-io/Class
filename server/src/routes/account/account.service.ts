import { Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';
import { UserNotFoundException } from '../../common/exceptions/user-not-found-exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { EmailAlreadyConfirmedException } from '../../common/exceptions/email-already-confirmed.exception';
import { IUser } from '../user/interfaces/IUser';

@Injectable()
export class AccountService {
    constructor(private readonly _usersSerivce: UsersService) {}

    public async confirmEmail(input: ConfirmEmailRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsAlreadyConfirmed(user);

        this._throwExceptionWhenConfirmationCodeIsInvalid(user, input.code);

        this._throwExceptionWhenConfirmationCodeIsExpired(user);

        await this._confirmEmailInDatabase(user);
    }

    private _throwExceptionWhenUserDoesNotExist(user: IUser | null): void {
        if(!user) {
            throw new UserNotFoundException();
        }
    }

    private _throwExceptionWhenAccountIsFromSocialMedia(user: IUser): void {
        if(user.isSocialMediaAccount) {
            throw new InvalidAccountTypeException();
        }
    }

    private _throwExceptionWhenEmailIsAlreadyConfirmed(user: IUser): void {
        if(user.isConfirmed) {
            throw new EmailAlreadyConfirmedException();
        }
    }

    private _throwExceptionWhenConfirmationCodeIsInvalid(user: IUser, code: string): void {
        if(user.confirmationCode.code !== code) {
            throw new InvalidConfirmationCodeException();
        }
    }

    private _throwExceptionWhenConfirmationCodeIsExpired(user: IUser): void {
        if(Date.now() > user.confirmationCode.expiresAt) {
            throw new ExpiredConfirmationCodeException();
        }
    }

    private async _confirmEmailInDatabase(user: IUser): Promise<void> {
        await this._usersSerivce.updateById(user.id, { confirmationCode: { code: '', expiresAt: Date.now() }, isConfirmed: true });
    }
}