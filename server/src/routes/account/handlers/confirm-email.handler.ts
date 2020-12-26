import { IUser } from '../../user/interfaces/IUser';
import { ConfirmEmailRequestDTO } from '../dto/confirm-email.dto';
import { BaseAccountHandler } from './base.handler';

export class ConfirmEmailHandler extends BaseAccountHandler {
    public async confirmEmail(input: ConfirmEmailRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsAlreadyConfirmed(user);

        this._throwExceptionWhenConfirmationCodeIsInvalid(user, input.code);

        this._throwExceptionWhenConfirmationCodeIsExpired(user);

        await this._confirmEmailInDatabase(user);
    }

    private async _confirmEmailInDatabase(user: IUser): Promise<void> {
        await this._usersSerivce.updateById(user.id, { confirmationCode: { code: '', expiresAt: Date.now() }, isConfirmed: true });
    }
}