import { Injectable } from "@nestjs/common";
import { compareStringToHash } from "../../common/helpers/compare-string-to-hash";
import { IUser } from "../user/interfaces/IUser";
import { UsersService } from "../user/users.service";
import { RegisterRequestDTO } from "./dto/register.dto";
import { UsernameAlreadyExistsException } from "../../common/exceptions/username-already-exists.exception";
import { hashString } from "../../common/helpers/hash-string";
import { InvalidCredentialsException } from "../../common/exceptions/invalid-credentials.exception";
import { EmailAlreadyExistsException } from "../../common/exceptions/email-already-exists.exception";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/login.dto";
import { IAccessTokenPayload } from "./interfaces/IAccessTokenPayload";
import { JwtService } from "../../services/jwt/jwt.service";
import Token from "../../common/constants/token";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Constants } from '../../common/constants';
import { EmailNotConfirmedException } from '../../common/exceptions/email-not-confirmed.exception';

@Injectable()
export class AuthService {
    constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService, private readonly _eventEmitter: EventEmitter2) {}

    public async register(input: RegisterRequestDTO): Promise<void> {
        await this._throwExceptionWhenEmailExistsInDatabase(input.email);
        await this._throwExceptionWhenUsernameExistsInDatabase(input.username);

        const user = await this._createUserInDatabase({...input });
        this._sendConfirmationCode(user.id, user.email);
    }

    public async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await this._getUserFromDatabaseByEmailOrThrowException(input.email);
        await this._throwExceptionWhenPasswordIsInvalid(input.password, user.password);

        this._throwExceptionWhenEmailIsNotConfirmed(user);
        const response = this._createLoginResponse(user);
        
        return response;
    }
    
    private async _throwExceptionWhenEmailExistsInDatabase(email: string): Promise<void> {
        const user = await this._usersService.get({ email });
        if(user) throw new EmailAlreadyExistsException();
    }

    private async _throwExceptionWhenUsernameExistsInDatabase(username: string): Promise<void> {
        const user = await this._usersService.get({ username });
        if(user) throw new UsernameAlreadyExistsException();
    }

    private async _createUserInDatabase(input: RegisterRequestDTO): Promise<IUser> {
        const hashedPassword = await hashString(input.password);
        const user = await this._usersService.create({ ...input, password: hashedPassword });

        return user;
    }

    private _createLoginResponse(user: IUser): LoginResponseDTO {
        const payload = this._getPayload(user);
        const accessToken = this._jwtService.generateToken(Token.ACCESS, payload);

        const response = { accessToken };
        return response;
    }

    private _sendConfirmationCode(id: string, email: string): void {
        this._eventEmitter.emit(Constants.Event.SEND_CONFIRMATION_CODE, { id, email });
    }

    private async _getUserFromDatabaseByEmailOrThrowException(email: string): Promise<IUser> {
        const user = await this._usersService.get({ email });
        if(!user) throw new InvalidCredentialsException();

        return user;
    }

    private async _throwExceptionWhenPasswordIsInvalid(password: string, hashedPassword: string): Promise<void> {
        const isPasswordValid = await compareStringToHash(password, hashedPassword);
        if(!isPasswordValid) throw new InvalidCredentialsException();
    }

    private _throwExceptionWhenEmailIsNotConfirmed(user: IUser): void {
        if(!user.isConfirmed) throw new EmailNotConfirmedException();
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