import { ChangePasswordRequestDTO } from '../dto/change-password.dto';
import { BaseAccountHandler } from './base.handler';
import { Request } from 'express';
import { compareStringToHash } from '../../../common/helpers/compare-string-to-hash';
import { InvalidCredentialsException } from '../../../common/exceptions/invalid-credentials.exception';

export class ChangePasswordHandler extends BaseAccountHandler {
    public async changePassword(request: Request, input: ChangePasswordRequestDTO): Promise<void> {
        const user = await this._userRepository.get({ _id: request.user.id });

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        await this._throwExceptionWhenPasswordIsInvalid(input.password, user.password);

        await this._updatePasswordInDatabase(user.id, input.newPassword);
    }

    private async _throwExceptionWhenPasswordIsInvalid(password: string, hashedPassword: string): Promise<void> {
        const isPasswordValid = await compareStringToHash(password, hashedPassword);
        if(!isPasswordValid) throw new InvalidCredentialsException();
    }
}