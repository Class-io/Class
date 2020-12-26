import { OAuth2Client } from 'google-auth-library';
import { Constants } from '../../../common/constants';
import config from '../../../config';
import { GoogleLoginRequestDTO } from '../dto/google.dto';
import { ITicket } from '../interfaces/ITicket';
import { BaseLoginHandler } from './base.handler';
import { Response } from 'express';

export class GoogleLoginHandler extends BaseLoginHandler {
    private readonly _client = new OAuth2Client(config.AUTH.GOOGLE_CLIENT_ID);
    protected readonly _accountType = Constants.AccountType.GOOGLE;

    public async loginWithGoogle(input: GoogleLoginRequestDTO, response: Response): Promise<void> {
        await this._getPayloadFromTokenOrThrowException(input.token)

        await this._throwExceptionWhenEmailExistsInDatabase();

        await this._createUserInDatabaseIfDoesNotExist();

        this._setCookie(response);
    }

    private async _getPayloadFromTokenOrThrowException(token: string): Promise<void> {
        const ticket = await this._getTicket(token);
        this._payload = ticket.getPayload();
    }
    
    private async _getTicket(token: string): Promise<ITicket> {
        return await this._client.verifyIdToken({
            idToken: token,
            audience: config.AUTH.GOOGLE_CLIENT_ID
        });
    }
}