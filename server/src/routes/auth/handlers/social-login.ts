import { BaseLoginHandler } from './base-login';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';

export abstract class SocialLoginHandler extends BaseLoginHandler {
    protected async _throwExceptionWhenEmailExistsInDatabase(): Promise<void> {
        this._user = await this._usersService.get({ email: this._payload.email });
        const userHasDifferentAccount = this._user && this._user.accountType !== this._accountType;

        if(userHasDifferentAccount) throw new EmailAlreadyExistsException();
    }

    protected async _createUserInDatabaseIfDoesNotExist(): Promise<void> {
       this._user = await this._usersService.get({ email: this._payload.email });
        if(!this._user) this._createUser();
    }
}