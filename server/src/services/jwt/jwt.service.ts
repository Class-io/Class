import { Injectable } from "@nestjs/common";
import Token from "../../common/constants/token";
import jwt from "jsonwebtoken";
import config from "../../config";

@Injectable()
export class JwtService {
    public generateToken(type: Token.ACCESS, payload: any): string {
        this._checkIfPayloadExists(payload);
        return this._createTokenBasedOnType(type, payload);
    }

    private _checkIfPayloadExists(payload: any): void {
        if(!payload) {
            throw new Error('Payload has to be provided');
        }
    }

    private _createTokenBasedOnType(type: Token, payload: any): string {
        switch(type) {
            case Token.ACCESS:
                return jwt.sign(payload, config.AUTH.ACCESS_TOKEN_SECRET);
            default:
                throw new Error('Token type is invalid');
        }
    }
}