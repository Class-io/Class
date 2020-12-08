import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../common/exceptions/user-not-found-exception";
import { compareStringToHash } from "../common/helpers/compare-string-to-hash";
import { IUser } from "../models/user/interfaces/IUser";
import { UsersService } from "../models/user/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterRequestDTO, RegisterResponseDTO } from "./dto/register.dto";
import { UsernameAlreadyExistsException } from "../common/exceptions/username-already-exists.exception";
import { IUserPayload } from "../models/user/interfaces/IUserPayload";
import { hashString } from "../common/helpers/hash-string";
import { InvalidCredentialsException } from "../common/exceptions/invalid-credentials.exception";
import { EmailAlreadyExistsException } from "../common/exceptions/email-already-exists.exception";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly _usersSerivce: UsersService, private readonly _jwtService: JwtService) {}

    public async register(input: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        await this._checkIfEmailAlreadyExistsInDatabase(input.email);
        await this._checkIfUsernameAlreadyExistsInDatabase(input.username);

        const user = await this._createUserInDatabase(input);
        const response = this._createResponse(user);

        return response;
    }

    public async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await this._getUserFromDatabaseByEmailOrThrowException(input.email);
        await this._checkIfPasswordIsValidInDatabase(input.password, user.password);

        const response = this._createResponse(user);
        return response;
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

    private async _createUserInDatabase(input: RegisterRequestDTO): Promise<IUser> {
        const hashedPassword = await hashString(input.password);
        const user = await this._usersSerivce.create({ ...input, password: hashedPassword });

        return user;
    }

    private _createResponse(user: IUser): RegisterResponseDTO {
        const payload = this._getPayload(user);
        const accessToken = this._jwtService.sign(payload, { expiresIn: '24h' }) 

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