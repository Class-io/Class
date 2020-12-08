import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public handleRequest<IUserPayload>(err: Error, user: IUserPayload): IUserPayload {
        if(err || !user) throw new UnauthorizedException();
        return user;
    }
}