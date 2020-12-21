import { Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { RegisterRequestDTO } from "./dto/register.dto";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/login.dto";
import { JwtService } from "../../services/jwt/jwt.service";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GoogleLoginRequestDTO } from './dto/google.dto';
import { RegisterHandler } from './handlers/register';
import { LoginHandler } from './handlers/login';
import { GoogleLoginHandler } from './handlers/google-login';
import { GithubLoginRequestDTO } from './dto/github.dto';
import { GithubLoginHandler } from './handlers/github-login';

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
        return new GoogleLoginHandler(input, this._usersService, this._jwtService).loginWithGoogle();
    }

    public async loginWithGithub(input: GithubLoginRequestDTO): Promise<LoginResponseDTO> {
        return new GithubLoginHandler(input, this._usersService, this._jwtService).loginWithGithub();
    }
}