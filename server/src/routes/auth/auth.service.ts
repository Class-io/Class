import { Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { RegisterRequestDTO } from "./dto/register.dto";
import { EmailAlreadyExistsException } from "../../common/exceptions/email-already-exists.exception";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/login.dto";
import { JwtService } from "../../services/jwt/jwt.service";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Constants } from '../../common/constants';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import config from '../../config';
import { GoogleLoginRequestDTO } from './dto/google.dto';
import AccountType from '../../common/constants/account-type';
import { RegisterHandler } from './handlers/register';
import { LoginHandler } from './handlers/login';

@Injectable()
export class AuthService {
    constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService, private readonly _eventEmitter: EventEmitter2) {}

    public async register(input: RegisterRequestDTO): Promise<void> {
        new RegisterHandler(input, this._usersService, this._eventEmitter).register();
    }

    public async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
        return new LoginHandler(input, this._usersService, this._jwtService).login();
    }
    
    public async loginWithGoogle(input: GoogleLoginRequestDTO): Promise<LoginResponseDTO> {
        const payload = await this._getPayloadFromGoogleTokenOrThrowException(input.token);

        await this._throwExceptionWhenUserHasDifferentAccount(payload.email, Constants.AccountType.GOOGLE);

        return {} as any;
    }   

    private async _throwExceptionWhenUserHasDifferentAccount(email: string, accountType: AccountType): Promise<void> {
        const user = await this._usersService.get({ email });
        const userHasDifferentAccount = user && user.accountType !== accountType;

        if(userHasDifferentAccount) throw new EmailAlreadyExistsException();
    }

    private async _getPayloadFromGoogleTokenOrThrowException(token: string): Promise<TokenPayload> {
        const client = new OAuth2Client(config.AUTH.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.AUTH.GOOGLE_CLIENT_ID
        });

        return ticket.getPayload();
    }
}