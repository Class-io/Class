import { IAccessTokenPayload } from "../routes/auth/interfaces/IAccessTokenPayload";

declare module 'express' {
    export interface Request {
        user?: IAccessTokenPayload
    }
}

export type TokenPayload = IAccessTokenPayload;