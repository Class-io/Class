import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../../routes/auth/auth.service";
import { IAccessTokenPayload } from "../../routes/auth/interfaces/IAccessTokenPayload";
import { JwtService } from "../../services/jwt/jwt.service";
import Token from "../constants/token";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(@Inject('JwtService') private readonly _jwtService: JwtService, @Inject('AuthService') private readonly _authService: AuthService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const token = this._getTokenFromContext(context);
        const payload = this._getPayloadOrThrowException(token);

        await this._authService.checkIfUserExistsInDatabaseById(payload.id);
        this._assignUserDataToRequest(context, payload);

        return true;
    }

    private _getTokenFromContext(context: ExecutionContext): string {
        return context.switchToHttp().getRequest().headers.authorization;
    }

    private _getPayloadOrThrowException(token: string): IAccessTokenPayload {
        const payload = this._jwtService.verifyTokenAndGetPayload(Token.ACCESS, token);
        return payload;
    }

    private _assignUserDataToRequest(context: ExecutionContext, payload: IAccessTokenPayload): void {
        context.switchToHttp().getRequest().user = payload;
    }
}