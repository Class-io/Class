import { Injectable } from "@nestjs/common";
import { RegisterRequestDTO } from "./dto/register.dto";
import { LoginRequestDTO } from "./dto/login.dto";
import { JwtService } from "../../services/jwt/jwt.service";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GoogleLoginRequestDTO } from './dto/google.dto';
import { RegisterHandler } from './handlers/register.handler';
import { LoginHandler } from './handlers/login.handler';
import { GoogleLoginHandler } from './handlers/google-login.handler';
import { GithubLoginRequestDTO } from './dto/github.dto';
import { GithubLoginHandler } from './handlers/github-login.handler';
import { Response } from 'express';
import { LogoutHandler } from './handlers/logout.handler';
import { UserRepository } from '../../database/models/user/user.repository';

@Injectable()
export class AuthService {
    constructor(private readonly _userRepository: UserRepository, private readonly _jwtService: JwtService, private readonly _eventEmitter: EventEmitter2) {}

    public async register(input: RegisterRequestDTO): Promise<void> {
        await new RegisterHandler(this._userRepository, this._eventEmitter).register(input);
    }

    public async login(input: LoginRequestDTO, response: Response): Promise<void> {
        await new LoginHandler(this._userRepository, this._jwtService).login(input, response);
    }
    
    public async loginWithGoogle(input: GoogleLoginRequestDTO, response: Response): Promise<void> {
        await new GoogleLoginHandler(this._userRepository, this._jwtService).loginWithGoogle(input, response);
    }

    public async loginWithGithub(input: GithubLoginRequestDTO, response: Response): Promise<void> {
        await new GithubLoginHandler(this._userRepository, this._jwtService).loginWithGithub(input, response);
    }

    public logout(response: Response): void {
        new LogoutHandler().logout(response);
    }
}