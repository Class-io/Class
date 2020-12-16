import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { IAccessTokenPayload } from "../../routes/auth/interfaces/IAccessTokenPayload";
import { UsersService } from '../../routes/user/users.service';
import { JwtService } from "../../services/jwt/jwt.service";
import Token from "../constants/token";
import { UserNotFoundException } from '../exceptions/user-not-found-exception';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(@Inject('JwtService') private readonly _jwtService: JwtService, @Inject('AuthService') private readonly _usersService: UsersService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const token = this._getTokenFromContext(context);
        const payload = this._getPayloadOrThrowException(token);

        await this._checkIfUsersExistsInDatabase(payload.id);
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

    private async _checkIfUsersExistsInDatabase(id: string): Promise<void> {
        const user = await this._usersService.get({ _id: id, isConfirmed: true });
        if(!user) throw new UserNotFoundException();
    }

    private _assignUserDataToRequest(context: ExecutionContext, payload: IAccessTokenPayload): void {
        context.switchToHttp().getRequest().user = payload;
    }
}