import { Body, Controller, HttpCode, Logger, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDTO } from "./dto/login.dto";
import { ValidationPipe } from "../../common/pipes/validation.pipe";
import { RegisterValidationSchema } from "./schemas/register.schema";
import { RegisterRequestDTO } from "./dto/register.dto";
import { Constants } from "../../common/constants";
import { LoginValidationSchema } from "./schemas/login.schema";
import { GoogleLoginValidationSchema } from './schemas/google.schema';
import { GoogleLoginRequestDTO } from './dto/google.dto';
import { GithubLoginValidationSchema } from './schemas/github.schema';
import { GithubLoginRequestDTO } from './dto/github.dto';
import { Response } from 'express';

@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}
    
    @Post(Constants.ENDPOINT.AUTH.REGISTER)
    @HttpCode(Constants.STATUS_CODE.CREATED)
    public async register(@Body(new ValidationPipe(RegisterValidationSchema)) body: RegisterRequestDTO): Promise<void> {
        await this._authService.register(body);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGIN)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async login(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(LoginValidationSchema)) body: LoginRequestDTO): Promise<void> {
        await this._authService.login(body, response);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGIN_GOOGLE)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async loginWithGoogle(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(GoogleLoginValidationSchema)) body: GoogleLoginRequestDTO): Promise<void> {
        await this._authService.loginWithGoogle(body, response);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGIN_GITHUB)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public async loginWithGithub(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(GithubLoginValidationSchema)) body: GithubLoginRequestDTO): Promise<void> {
        await this._authService.loginWithGithub(body, response);
    }

    @Post(Constants.ENDPOINT.AUTH.LOGOUT)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    public logout(@Res({ passthrough: true }) response: Response): void {
        this._authService.logout(response);
    }
}