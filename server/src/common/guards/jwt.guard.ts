import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../../routes/auth/auth.service";
import { IAccessTokenPayload } from "../../routes/auth/interfaces/IAccessTokenPayload";
import { JwtService } from "../../services/jwt/jwt.service";
import { TokenPayload } from "../../types";
import Token from "../constants/token";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(@Inject('JwtService') private readonly _jwtService: JwtService, @Inject('AuthService') private readonly _authService: AuthService) {}

    public canActivate(context: ExecutionContext): boolean {
        const token = this._getTokenFromContext(context);
        const payload = this._getPayloadOrThrowException(token);

        return true;
    }

    private _getTokenFromContext(context: ExecutionContext): string {
        return context.switchToHttp().getRequest().headers.authorization;
    }

    private _getPayloadOrThrowException(token: string): IAccessTokenPayload {
        const payload = this._jwtService.verifyTokenAndGetPayload(Token.ACCESS, token);
        return payload;
    }
}