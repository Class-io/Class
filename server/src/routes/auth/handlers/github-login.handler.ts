import { Constants } from '../../../common/constants';
import axios from 'axios';
import config from '../../../config';
import { GithubLoginRequestDTO } from '../dto/github.dto';
import { BaseLoginHandler } from './base.handler';
import { Response } from 'express';
import { InvalidCredentialsException } from '../../../common/exceptions/invalid-credentials.exception';

export class GithubLoginHandler extends BaseLoginHandler {
    private readonly ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
    private readonly PAYLOAD_URL = 'https://api.github.com/user';
    protected readonly _accountType = Constants.ACCOUNT_TYPE.GITHUB;

    public async loginWithGithub(input: GithubLoginRequestDTO, response: Response): Promise<void> {
        await this._getPayloadFromTokenOrThrowException(input.code);

        await this._throwExceptionWhenEmailExistsInDatabase(); 

        await this._createUserInDatabaseIfDoesNotExist();

        this._setCookie(response);
    }

    private async _getPayloadFromTokenOrThrowException(code: string): Promise<void> {
        try {
            const accessToken = await this._requestAccessToken(code);
            await this._requestPayload(accessToken);
        } catch(error) {
            throw new InvalidCredentialsException();
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