import { GithubLoginRequestDTO } from '../routes/auth/dto/github.dto';
import { GoogleLoginRequestDTO } from '../routes/auth/dto/google.dto';
import { LoginRequestDTO } from '../routes/auth/dto/login.dto';
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
export type LoginDTO = LoginRequestDTO | GoogleLoginRequestDTO | GithubLoginRequestDTO; 