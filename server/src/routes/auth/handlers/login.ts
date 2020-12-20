import { Constants } from '../../../common/constants';
import Token from '../../../common/constants/token';
import { EmailNotConfirmedException } from '../../../common/exceptions/email-not-confirmed.exception';
import { InvalidCredentialsException } from '../../../common/exceptions/invalid-credentials.exception';
import { compareStringToHash } from '../../../common/helpers/compare-string-to-hash';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';

export class LoginHandler {
    private _user: IUser;

    constructor(private readonly _input: LoginRequestDTO, private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}

    public async login(): Promise<LoginResponseDTO> {
        await this._getUserFromDatabaseByEmailOrThrowException();
        
        await this._throwExceptionWhenPasswordIsInvalid();

        this._throwExceptionWhenEmailIsNotConfirmed();

        return this._createResponse();
    }

    private async _getUserFromDatabaseByEmailOrThrowException(): Promise<void> {
        this._user = await this._usersService.get({ email: this._input.email });
        const userDoesNotExistOrHasSocialMediaAccount = !this._user || this._user.accountType !== Constants.AccountType.REGULAR;

        if(userDoesNotExistOrHasSocialMediaAccount) throw new InvalidCredentialsException();
    }

    private async _throwExceptionWhenPasswordIsInvalid(): Promise<void> {
        const isPasswordValid = await compareStringToHash(this._input.password, this._user.password);
        if(!isPasswordValid) throw new InvalidCredentialsException();
    }
    
    private _throwExceptionWhenEmailIsNotConfirmed(): void {
        if(!this._user.isConfirmed) throw new EmailNotConfirmedException();
    }

    private _createResponse(): LoginResponseDTO {
        const payload = this._createPayload();
        const accessToken = this._jwtService.generateToken(Token.ACCESS, payload);

        return { accessToken };
    }

    private _createPayload(): IAccessTokenPayload {
        return {
            id: this._user.id,
            username: this._user.username,
            email: this._user.email,
            isTutor: this._user.isTutor
        }
    }
}