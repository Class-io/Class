import { Injectable } from "@nestjs/common";
import Token from "../../common/constants/token";
import jwt, { VerifyErrors } from "jsonwebtoken";
import config from "../../config";
import { TokenPayload } from "../../types";
import { IAccessTokenPayload } from "../../routes/auth/interfaces/IAccessTokenPayload";
import { ITokenProperties } from "./interfaces/ITokenProperties";

@Injectable()
export class JwtService {
    public generateToken(type: Token.ACCESS, payload: IAccessTokenPayload): string {
        this._checkIfPayloadExists(payload);
        return this._createToken(type, payload);
    }

    public verifyTokenAndGetPayload(type: Token.ACCESS, token: string): IAccessTokenPayload {
        this._checkIfTokenExistsAndHasTypeString(token);
        return this._getPayloadOrThrowError(type, token);
    }

    private _checkIfPayloadExists(payload: TokenPayload): void {
        if(!payload) {
            throw new Error('Payload has to be provided');
        }
    }

    private _createToken(type: Token, payload: TokenPayload): string {
        const { secret, expiresIn } = this._getTokenProperties(type);
        const token = jwt.sign(payload, secret, { expiresIn });

        return token;
    }

    private _checkIfTokenExistsAndHasTypeString(token: string): void {
        const tokenExists = token;
        const tokenHasTypeString = typeof token === 'string';

        if(!tokenExists || !tokenHasTypeString) throw new Error('Token does not exist or is not a string');
    }

    private _getPayloadOrThrowError(type: Token, token: string): TokenPayload {
        const secret = this._getTokenProperties(type).secret;
        let payload: TokenPayload;

        jwt.verify(token, secret, (error: VerifyErrors, data: TokenPayload) => {
            if(error) throw error;
            payload = data;
        });

        return payload;
    }

    private _getTokenProperties(type: Token): ITokenProperties {
        switch(type) {
            case Token.ACCESS:
                return { secret: config.AUTH.ACCESS_TOKEN_SECRET, expiresIn: '' }
            default:
                throw new Error('Token type is invalid');
        }
    }
}