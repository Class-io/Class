import { Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { JwtService } from "../../services/jwt/jwt.service";

@Injectable()
export class AuthService {
    constructor(private readonly _usersSerivce: UsersService, private readonly _jwtService: JwtService) {}
}