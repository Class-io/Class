import { Constants } from '../../../common/constants';
import AccountType from '../../../common/constants/account-type';
import { EmailNotConfirmedException } from '../../../common/exceptions/email-not-confirmed.exception';
import { InvalidCredentialsException } from '../../../common/exceptions/invalid-credentials.exception';
import { compareStringToHash } from '../../../common/helpers/compare-string-to-hash';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';
import { BaseLoginHandler } from './base.handler';

export class LoginHandler extends BaseLoginHandler {
    protected _accountType: AccountType = Constants.AccountType.REGULAR;

    public async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
        await this._getUserFromDatabaseByEmailOrThrowException(input.email);
        
        await this._throwExceptionWhenPasswordIsInvalid(input.password);

        this._throwExceptionWhenEmailIsNotConfirmed();

        return this._createResponse();
    }

    private async _getUserFromDatabaseByEmailOrThrowException(email: string): Promise<void> {
        this._user = await this._usersService.get({ email });
        const userDoesNotExistOrHasSocialMediaAccount = !this._user || this._user.password === '';

        if(userDoesNotExistOrHasSocialMediaAccount) throw new InvalidCredentialsException();
    }

    private async _throwExceptionWhenPasswordIsInvalid(password: string): Promise<void> {
        const isPasswordValid = await compareStringToHash(password, this._user.password);
        if(!isPasswordValid) throw new InvalidCredentialsException();
    }
    
    private _throwExceptionWhenEmailIsNotConfirmed(): void {
        if(!this._user.isConfirmed) throw new EmailNotConfirmedException();
    }
}