import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../common/exceptions/user-not-found-exception";
import { compareStringToHash } from "../common/helpers/compare-string-to-hash";
import { UserDTO } from "../models/user/dto/user.dto";
import { IUser } from "../models/user/interfaces/IUser";
import { UsersService } from "../models/user/users.service";
import { LoginResponse } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { RegisterResponse } from "./dto/register.dto";
import { UsernameAlreadyExistsException } from "../common/exceptions/username-already-exists.exception";
import { IUserPayload } from "../models/user/interfaces/IUserPayload";
import { CreateUserDTO } from "../models/user/dto/create.dto";
import { hashString } from "../common/helpers/hash-string";
import { InvalidCredentialsException } from "../common/exceptions/invalid-credentials.exception";

@Injectable()
export class AuthService {
    constructor(private readonly _usersSerivce: UsersService, private readonly _jwtService: JwtService) {}

    public async validateUser(username: string, password: string): Promise<IUser> {
        const user: IUser | null = await this._usersSerivce.get({ username });
        if(!user) throw new InvalidCredentialsException();

        const isPasswordValid: boolean = await compareStringToHash(password, user.password);
        if(!isPasswordValid) throw new InvalidCredentialsException();

        return user;
    }

    public login(user: UserDTO): LoginResponse {
        const payload: IUserPayload = this._getPayload(user);
        const accessToken: string = this._jwtService.sign(payload, { expiresIn: '24h' });

        const response: LoginResponse = { accessToken };
        return response;
    }

    public async register(input: CreateUserDTO): Promise<RegisterResponse> {
        const existingUser: IUser | null = await this._usersSerivce.get({ username: input.username });
        if(existingUser) throw new UsernameAlreadyExistsException();

        const user: IUser = await this._usersSerivce.create({ ...input, password: await hashString(input.password) });
        const payload: IUserPayload = this._getPayload(user);

        const accessToken: string = this._jwtService.sign(payload, { expiresIn: '24h' }) 
        const response: RegisterResponse = { accessToken };

        return response;
    }
    
    public async checkIfUserExistsInDatabase(username: string): Promise<void> {
        const user: IUser | null = await this._usersSerivce.get({ username });
        if(!user) throw new UserNotFoundException();
    }

    private _getPayload(user: IUserPayload): IUserPayload {
        return {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }
}