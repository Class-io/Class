import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserDTO } from "../../models/user/dto/user.dto";
import { IUser } from "../../models/user/interfaces/IUser";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly _authService: AuthService) {
        super({ usernameField: 'email' });
    }

    public async validate(email: string, password: string): Promise<UserDTO> {
        const user: IUser = await this._authService.validateCredentials(email, password);
        const dto = UserDTO.fromObject(user);

        return dto;
    }
}