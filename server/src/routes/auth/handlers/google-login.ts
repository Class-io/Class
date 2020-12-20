import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Constants } from '../../../common/constants';
import Token from '../../../common/constants/token';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import config from '../../../config';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { GoogleLoginRequestDTO } from '../dto/google.dto';
import { LoginResponseDTO } from '../dto/login.dto';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';
import { ITicket } from '../interfaces/ITicket';

export class GoogleLoginHandler {
    private readonly _client = new OAuth2Client(config.AUTH.GOOGLE_CLIENT_ID);
    private _user: IUser;
    private _payload: TokenPayload;

    constructor(private readonly _input: GoogleLoginRequestDTO, private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}

    public async loginWithGoogle(): Promise<LoginResponseDTO> {
        await this._getPayloadFromGoogleTokenOrThrowException(this._input.token)

        await this._throwExceptionWhenEmailExistsInDatabase();

        await this._createUserInDatabaseIfDoesNotExist();

        return this._createResponse();
    }

    private async _getPayloadFromGoogleTokenOrThrowException(token: string): Promise<void> {
        const ticket = await this._getTicketOrThrowException(token);
        this._payload = ticket.getPayload();
    }

    private async _throwExceptionWhenEmailExistsInDatabase(): Promise<void> {
        this._user = await this._usersService.get({ email: this._payload.email });
        const userHasDifferentAccount = this._user && this._user.accountType !== Constants.AccountType.GOOGLE;

        if(userHasDifferentAccount) throw new EmailAlreadyExistsException();
    }

    private async _createUserInDatabaseIfDoesNotExist(): Promise<void> {
       this._user = await this._usersService.get({ email: this._payload.email });
        if(!this._user) this._createUser();
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

    private async _createUser(): Promise<void> {
        this._user = await this._usersService.create({
            email: this._payload.email,
            username: this._payload.email,
            isConfirmed: true,
            accountType: Constants.AccountType.GOOGLE
        })
    }

    private async _getTicketOrThrowException(token: string): Promise<ITicket> {
        return await this._client.verifyIdToken({
            idToken: token,
            audience: config.AUTH.GOOGLE_CLIENT_ID
        });
    }
}