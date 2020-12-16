import { Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { JwtService } from "../../services/jwt/jwt.service";
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';

@Injectable()
export class AuthService {
    constructor(private readonly _usersSerivce: UsersService) {}

    public async confirmEmail(input: ConfirmEmailRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });
    }
}