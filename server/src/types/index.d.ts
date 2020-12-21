import { GithubLoginRequestDTO } from '../routes/auth/dto/github.dto';
import { GoogleLoginRequestDTO } from '../routes/auth/dto/google.dto';
import { LoginRequestDTO } from '../routes/auth/dto/login.dto';
import { IAccessTokenPayload } from "../routes/auth/interfaces/IAccessTokenPayload";

declare module 'express' {
    export interface Request {
        user?: IAccessTokenPayload
    }
}

export type TokenPayload = IAccessTokenPayload;
export type LoginDTO = LoginRequestDTO | GoogleLoginRequestDTO | GithubLoginRequestDTO; 