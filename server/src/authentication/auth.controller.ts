import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login.dto";
import { ValidationPipe } from "../common/pipes/validation.pipe";
import { RegisterValidationSchema } from "./schemas/register.schema";
import { CreateUserDTO } from "../models/user/dto/create.dto";
import { RegisterResponse } from "./dto/register.dto";
import { Constants } from "../common/constants";
import { LocalAuthGuard } from "../common/guards/local.guard";

@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post(Constants.Endpoint.Auth.LOGIN)
    @HttpCode(200)
    public login(@Req() req: Request): LoginResponse {
        return this._authService.login(req.user);
    }

    @Post(Constants.Endpoint.Auth.REGISTER)
    public async register(@Body(new ValidationPipe(RegisterValidationSchema)) body: CreateUserDTO): Promise<RegisterResponse> {
        return this._authService.register(body);
    }
}