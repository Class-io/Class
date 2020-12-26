import Token from '../../../common/constants/token';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';
import { AuthTokenPayload } from '../../../types';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import AccountType from '../../../common/constants/account-type';
import { Response } from 'express';

export abstract class BaseLoginHandler {
    protected abstract readonly _accountType: AccountType;
    protected _payload: AuthTokenPayload;
    protected _user: IUser;

    constructor(protected readonly _usersService: UsersService, protected readonly _jwtService: JwtService) {}

    protected async _createUserInDatabaseIfDoesNotExist(): Promise<void> {
        this._user = await this._usersService.get({ email: this._payload.email });
        if(!this._user) this._createUser();
    }

    protected async _throwExceptionWhenEmailExistsInDatabase(): Promise<void> {
        this._user = await this._usersService.get({ email: this._payload.email });
        const userHasDifferentAccount = this._user && this._user.accountType !== this._accountType;

        if(userHasDifferentAccount) throw new EmailAlreadyExistsException();
    }

    protected _setCookie(response: Response): void {
        const payload = this._createPayload();
        const accessToken = this._jwtService.generateToken(Token.ACCESS, payload);

        response.cookie('authorization', accessToken, { httpOnly: true });
    }

    protected async _createUser(): Promise<void> {
        this._user = await this._usersService.create({
            email: this._payload.email,
            username: this._payload.email,
            isConfirmed: true,
            accountType: this._accountType
        })
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