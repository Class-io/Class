import { OAuth2Client } from 'google-auth-library';
import { Constants } from '../../../common/constants';
import config from '../../../config';
import { GoogleLoginRequestDTO } from '../dto/google.dto';
import { LoginResponseDTO } from '../dto/login.dto';
import { ITicket } from '../interfaces/ITicket';
import { BaseLoginHandler } from './base.handler';

export class GoogleLoginHandler extends BaseLoginHandler {
    private readonly _client = new OAuth2Client(config.AUTH.GOOGLE_CLIENT_ID);
    protected readonly _accountType = Constants.AccountType.GOOGLE;

    public async loginWithGoogle(): Promise<LoginResponseDTO> {
        await this._getPayloadFromTokenOrThrowException()

        await this._throwExceptionWhenEmailExistsInDatabase();

        await this._createUserInDatabaseIfDoesNotExist();

        return this._createResponse();
    }

    private async _getPayloadFromTokenOrThrowException(): Promise<void> {
        const ticket = await this._getTicket((this._input as GoogleLoginRequestDTO).token);
        this._payload = ticket.getPayload();
    }
    
    private async _getTicket(token: string): Promise<ITicket> {
        return await this._client.verifyIdToken({
            idToken: token,
            audience: config.AUTH.GOOGLE_CLIENT_ID
        });
    }
}