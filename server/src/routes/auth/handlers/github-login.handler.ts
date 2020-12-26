import { Constants } from '../../../common/constants';
import { LoginResponseDTO } from '../dto/login.dto';
import axios from 'axios';
import config from '../../../config';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';
import { GithubLoginRequestDTO } from '../dto/github.dto';
import { BaseLoginHandler } from './base.handler';

export class GithubLoginHandler extends BaseLoginHandler {
    private readonly ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
    private readonly PAYLOAD_URL = 'https://api.github.com/user';
    protected readonly _accountType = Constants.AccountType.GITHUB;

    public async loginWithGithub(input: GithubLoginRequestDTO): Promise<LoginResponseDTO> {
        await this._getPayloadFromTokenOrThrowException(input.code);

        await this._throwExceptionWhenEmailExistsInDatabase(); 

        await this._createUserInDatabaseIfDoesNotExist();

        return this._createResponse();
    }

    private async _getPayloadFromTokenOrThrowException(code: string): Promise<void> {
        try {
            const accessToken = await this._requestAccessToken(code);
            await this._requestPayload(accessToken);
        } catch(error) {
            throw new UnauthorizedException();
        }
    }

    private async _requestAccessToken(code: string): Promise<string> {
        const response = await axios.post(this.ACCESS_TOKEN_URL, {
            client_id: config.AUTH.GITHUB_CLIENT_ID,
            client_secret: config.AUTH.GITHUB_CLIENT_SECRET,
            code: code
        }, { headers: { "Accept": "application/json" }});

        return response.data.access_token;
    }

    private async _requestPayload(accessToken: string): Promise<void> {
        const response = await axios.get(this.PAYLOAD_URL, { headers: { "Authorization": `Bearer ${accessToken}` }});
        this._payload = response.data;
    }
}