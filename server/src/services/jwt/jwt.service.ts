import { Injectable } from "@nestjs/common";
import Token from "../../common/constants/token";
import jwt from "jsonwebtoken";
import config from "../../config";
import { TokenPayload } from "../../types";
import { IAccessTokenPayload } from "../../routes/auth/interfaces/IAccessTokenPayload";

@Injectable()
export class JwtService {
    public generateToken(type: Token.ACCESS, payload: IAccessTokenPayload): string {
        this._checkIfPayloadExists(payload);
        return this._createTokenBasedOnType(type, payload);
    }

    public verifyTokenAndGetPayload(type: Token.ACCESS, token: string): IAccessTokenPayload {

    }

    private _checkIfPayloadExists(payload: TokenPayload): void {
        if(!payload) {
            throw new Error('Payload has to be provided');
        }
    }

    private _createTokenBasedOnType(type: Token, payload: TokenPayload): string {
        switch(type) {
            case Token.ACCESS:
                return jwt.sign(payload, config.AUTH.ACCESS_TOKEN_SECRET);
            default:
                throw new Error('Token type is invalid');
        }
    }

    
}