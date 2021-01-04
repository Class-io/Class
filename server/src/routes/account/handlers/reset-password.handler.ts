import { ResetPasswordRequestDTO } from '../dto/reset-password.dto';
import { BaseAccountHandler } from './base.handler';

export class ResetPasswordHandler extends BaseAccountHandler {
    public async resetPassword(input: ResetPasswordRequestDTO): Promise<void> {
        const user = await this._userRepository.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsNotConfirmed(user)

        this._throwExceptionWhenConfirmationCodeIsInvalid(user, input.code);

        this._throwExceptionWhenConfirmationCodeIsExpired(user);

        await this._updatePasswordInDatabase(user.id, input.password);
    }
}