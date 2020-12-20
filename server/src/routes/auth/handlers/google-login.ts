import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Constants } from '../../../common/constants';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import config from '../../../config';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { GoogleLoginRequestDTO } from '../dto/google.dto';
import { LoginResponseDTO } from '../dto/login.dto';
import { ITicket } from '../interfaces/ITicket';

export class GoogleLoginHandler {
    private readonly _client = new OAuth2Client(config.AUTH.GOOGLE_CLIENT_ID);
    private _user: IUser;
    private _payload: TokenPayload;

    constructor(private readonly _input: GoogleLoginRequestDTO, private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}

    public async loginWithGoogle(): Promise<LoginResponseDTO> {
        await this._getPayloadFromGoogleTokenOrThrowException(this._input.token)

        await this._throwExceptionWhenEmailExistsInDatabase();

        return {} as any;
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

    private async _getTicketOrThrowException(token: string): Promise<ITicket> {
        return await this._client.verifyIdToken({
            idToken: token,
            audience: config.AUTH.GOOGLE_CLIENT_ID
        });
    }
}