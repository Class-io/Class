import { TokenPayload } from 'google-auth-library';

export interface ITicket {
    getPayload: () => TokenPayload;
}