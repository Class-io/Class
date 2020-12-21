import Token from '../../../common/constants/token';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { LoginResponseDTO } from '../dto/login.dto';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';
import { IGithubPayload } from '../interfaces/IGithubPayload';
import { LoginDTO } from '../../../types';
import AccountType from '../../../common/constants/account-type';

export abstract class BaseLoginHandler {
    protected abstract readonly _accountType: AccountType;
    protected _user: IUser;
    protected _payload: IGithubPayload;

    constructor(protected readonly _input: LoginDTO, protected readonly _usersService: UsersService, protected readonly _jwtService: JwtService) {}

    protected _createResponse(): LoginResponseDTO {
        const payload = this._createPayload();
        const accessToken = this._jwtService.generateToken(Token.ACCESS, payload);

        return { accessToken };
    }

    protected _createPayload(): IAccessTokenPayload {
        return {
            id: this._user.id,
            username: this._user.username,
            email: this._user.email,
            isTutor: this._user.isTutor
        }
    }

    protected async _createUser(): Promise<void> {
        this._user = await this._usersService.create({
            email: this._payload.email,
            username: this._payload.login,
            isConfirmed: true,
            accountType: this._accountType
        })
    }
}