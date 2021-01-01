import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
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
    
    @Post(Constants.ENDPOINT.Auth.REGISTER)
    public async register(@Body(new ValidationPipe(RegisterValidationSchema)) body: RegisterRequestDTO): Promise<void> {
        await this._authService.register(body);
    }

    @Post(Constants.ENDPOINT.Auth.LOGIN)
    @HttpCode(200)
    public async login(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(LoginValidationSchema)) body: LoginRequestDTO): Promise<void> {
        await this._authService.login(body, response);
    }

    @Post(Constants.ENDPOINT.Auth.LOGIN_GOOGLE)
    @HttpCode(200)
    public async loginWithGoogle(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(GoogleLoginValidationSchema)) body: GoogleLoginRequestDTO): Promise<void> {
        await this._authService.loginWithGoogle(body, response);
    }

    @Post(Constants.ENDPOINT.Auth.LOGIN_GITHUB)
    @HttpCode(200)
    public async loginWithGithub(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe(GithubLoginValidationSchema)) body: GithubLoginRequestDTO): Promise<void> {
        await this._authService.loginWithGithub(body, response);
    }
}