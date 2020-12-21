import Token from '../../../common/constants/token';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { LoginResponseDTO } from '../dto/login.dto';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';
import { AuthTokenPayload, LoginDTO } from '../../../types';
import AccountType from '../../../common/constants/account-type';

export abstract class BaseLoginHandler {
    protected abstract readonly _accountType: AccountType;
    protected _user: IUser;
    protected _payload: AuthTokenPayload;

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
}