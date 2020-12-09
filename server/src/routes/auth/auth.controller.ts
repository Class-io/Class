import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/login.dto";
import { ValidationPipe } from "../../common/pipes/validation.pipe";
import { RegisterValidationSchema } from "./schemas/register.schema";
import { RegisterRequestDTO, RegisterResponseDTO } from "./dto/register.dto";
import { Constants } from "../../common/constants";
import { LoginValidationSchema } from "./schemas/login.schema";
import { JwtGuard } from "../../common/guards/jwt.guard";
import { Request } from 'express';

@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}
    
    @Post(Constants.Endpoint.Auth.LOGIN)
    @HttpCode(200)
    @UseGuards(JwtGuard)
    public login(@Body(new ValidationPipe(LoginValidationSchema)) body: LoginRequestDTO, @Req() req: Request): Promise<LoginResponseDTO> {
        console.log(req);
        return this._authService.login(body);
    }

    @Post(Constants.Endpoint.Auth.REGISTER)
    public register(@Body(new ValidationPipe(RegisterValidationSchema)) body: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        return this._authService.register(body);
    }
}