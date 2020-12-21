import { Constants } from '../../../common/constants';
import Token from '../../../common/constants/token';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { GithubLoginRequestDTO } from '../dto/github.dto';
import { LoginResponseDTO } from '../dto/login.dto';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';
import axios from 'axios';
import config from '../../../config';
import { IGithubPayload } from '../interfaces/IGithubPayload';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';

export class GithubLoginHandler {
    private readonly ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
    private readonly PAYLOAD_URL = 'https://api.github.com/user';
    private _user: IUser;
    private _payload: IGithubPayload;

    constructor(private readonly _input: GithubLoginRequestDTO, private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}

    public async loginWithGithub(): Promise<LoginResponseDTO> {
        await this._getPayloadFromTokenOrThrowException();

        await this._throwExceptionWhenEmailExistsInDatabase(); 

        await this._createUserInDatabaseIfDoesNotExist();

        return this._createResponse();
    }

    private async _getPayloadFromTokenOrThrowException(): Promise<void> {
        try {
            const accessToken = await this._requestAccessToken();
            await this._requestPayload(accessToken);
        } catch(error) {
            throw new UnauthorizedException();
        }
    }

    private async _throwExceptionWhenEmailExistsInDatabase(): Promise<void> {
        this._user = await this._usersService.get({ email: this._payload.email });
        const userHasDifferentAccount = this._user && this._user.accountType !== Constants.AccountType.GITHUB;

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
            username: this._payload.login,
            isConfirmed: true,
            accountType: Constants.AccountType.GITHUB
        })
    }

    private async _requestAccessToken(): Promise<string> {
        const response = await axios.post(this.ACCESS_TOKEN_URL, {
            client_id: config.AUTH.GITHUB_CLIENT_ID,
            client_secret: config.AUTH.GITHUB_CLIENT_SECRET,
            code: this._input.code
        }, { headers: { "Accept": "application/json" }});

        return response.data.access_token;
    }

    private async _requestPayload(accessToken: string): Promise<void> {
        const response = await axios.get(this.PAYLOAD_URL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        this._payload = response.data;
    }
}