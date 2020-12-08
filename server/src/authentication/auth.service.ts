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
import { EmailAlreadyExistsException } from "../common/exceptions/email-already-exists.exception";

@Injectable()
export class AuthService {
    constructor(private readonly _usersSerivce: UsersService, private readonly _jwtService: JwtService) {}

    public async register(input: CreateUserDTO): Promise<RegisterResponse> {
        await this._checkIfEmailAlreadyExistsInDatabase(input.email);
        await this._checkIfUsernameAlreadyExistsInDatabase(input.username);

        const user = await this._createUserInDatabase(input);
        const response = this._createRegisterResponse(user);

        return response;
    }

    public login(user: UserDTO): LoginResponse {
        const response = this._createLoginResponse(user);
        return response;
    }

    public async validateCredentials(email: string, password: string): Promise<IUser> {
        const user = await this._getUserFromDatabaseByEmailOrThrowException(email);
        await this._checkIfPasswordIsValidInDatabase(password, user.password);

        return user;
    }

    public async checkIfUserExistsInDatabase(username: string): Promise<void> {
        const user = await this._usersSerivce.get({ username });
        if(!user) throw new UserNotFoundException();
    }

    private async _checkIfUsernameAlreadyExistsInDatabase(username: string): Promise<void> {
        const user = await this._usersSerivce.get({ username });
        if(user) throw new UsernameAlreadyExistsException();
    }

    private async _checkIfEmailAlreadyExistsInDatabase(email: string): Promise<void> {
        const user = await this._usersSerivce.get({ email });
        if(user) throw new EmailAlreadyExistsException();
    }

    private async _createUserInDatabase(input: CreateUserDTO): Promise<IUser> {
        const hashedPassword = await hashString(input.password);
        const user = await this._usersSerivce.create({ ...input, password: hashedPassword });

        return user;
    }

    private _createRegisterResponse(user: IUser): RegisterResponse {
        const payload = this._getPayload(user);
        const accessToken = this._jwtService.sign(payload, { expiresIn: '24h' }) 

        const response = { accessToken };
        return response;
    }

    private _createLoginResponse(user: UserDTO): LoginResponse {
        const payload = this._getPayload(user);
        const accessToken = this._jwtService.sign(payload, { expiresIn: '24h' });

        const response = { accessToken };
        return response;
    }

    private async _getUserFromDatabaseByEmailOrThrowException(email: string): Promise<IUser> {
        const user = await this._usersSerivce.get({ email });
        if(!user) throw new InvalidCredentialsException();

        return user;
    }

    private async _checkIfPasswordIsValidInDatabase(password: string, hashedPassword: string): Promise<void> {
        const isPasswordValid = await compareStringToHash(password, hashedPassword);
        if(!isPasswordValid) throw new InvalidCredentialsException();
    }

    private _getPayload(user: IUserPayload): IUserPayload {
        return {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }
}