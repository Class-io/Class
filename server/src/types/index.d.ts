import { IAccessTokenPayload } from "../routes/auth/interfaces/IAccessTokenPayload";
import { IGithubPayload } from '../routes/auth/interfaces/IGithubPayload';
import { TokenPayload as IGooglePayload } from 'google-auth-library';

declare module 'express' {
    export interface Request {
        user?: IAccessTokenPayload
    }
}

export type TokenPayload = IAccessTokenPayload;
export type AuthTokenPayload = IGithubPayload | IGooglePayload;