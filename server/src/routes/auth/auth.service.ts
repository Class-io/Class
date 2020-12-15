import { Injectable } from "@nestjs/common";
import { compareStringToHash } from "../../common/helpers/compare-string-to-hash";
import { IUser } from "../user/interfaces/IUser";
import { UsersService } from "../user/users.service";
import { RegisterRequestDTO, RegisterResponseDTO } from "./dto/register.dto";
import { UsernameAlreadyExistsException } from "../../common/exceptions/username-already-exists.exception";
import { hashString } from "../../common/helpers/hash-string";
import { InvalidCredentialsException } from "../../common/exceptions/invalid-credentials.exception";
import { EmailAlreadyExistsException } from "../../common/exceptions/email-already-exists.exception";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/login.dto";
import { IAccessTokenPayload } from "./interfaces/IAccessTokenPayload";
import { JwtService } from "../../services/jwt/jwt.service";
import Token from "../../common/constants/token";
import { UserNotFoundException } from '../../common/exceptions/user-not-found-exception';
import { MailService } from '../../services/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(private readonly _usersSerivce: UsersService, private readonly _jwtService: JwtService, private readonly _mailService: MailService) {}

    public async register(input: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        await this._checkIfEmailAlreadyExistsInDatabase(input.email);
        await this._checkIfUsernameAlreadyExistsInDatabase(input.username);

        const user = await this._createUserInDatabase({...input });
        const response = this._createResponse(user);

        return response;
    }

    public async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await this._getUserFromDatabaseByEmailOrThrowException(input.email);
        await this._checkIfPasswordIsValidInDatabase(input.password, user.password);

        const response = this._createResponse(user);
        return response;
    }

    public async checkIfUserExistsInDatabaseById(id: string): Promise<void> {
        const user = await this._usersSerivce.get({ _id: id, isConfirmed: true });
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
        const accessToken = this._jwtService.generateToken(Token.ACCESS, payload);

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

    private _getPayload(user: IAccessTokenPayload): IAccessTokenPayload {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            isTutor: user.isTutor
        }
    }
}