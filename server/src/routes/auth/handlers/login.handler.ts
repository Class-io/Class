import { EmailNotConfirmedException } from '../../../common/exceptions/email-not-confirmed.exception';
import { InvalidCredentialsException } from '../../../common/exceptions/invalid-credentials.exception';
import { compareStringToHash } from '../../../common/helpers/compare-string-to-hash';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';
import { BaseLoginHandler } from './base.handler';

export class LoginHandler extends BaseLoginHandler {
    public async login(): Promise<LoginResponseDTO> {
        await this._getUserFromDatabaseByEmailOrThrowException();
        
        await this._throwExceptionWhenPasswordIsInvalid();

        this._throwExceptionWhenEmailIsNotConfirmed();

        return this._createResponse();
    }

    private async _getUserFromDatabaseByEmailOrThrowException(): Promise<void> {
        this._user = await this._usersService.get({ email: (this._input as LoginRequestDTO).email });
        const userDoesNotExistOrHasSocialMediaAccount = !this._user || this._user.password === '';

        if(userDoesNotExistOrHasSocialMediaAccount) throw new InvalidCredentialsException();
    }

    private async _throwExceptionWhenPasswordIsInvalid(): Promise<void> {
        const isPasswordValid = await compareStringToHash((this._input as LoginRequestDTO).password, this._user.password);
        if(!isPasswordValid) throw new InvalidCredentialsException();
    }
    
    private _throwExceptionWhenEmailIsNotConfirmed(): void {
        if(!this._user.isConfirmed) throw new EmailNotConfirmedException();
    }
}