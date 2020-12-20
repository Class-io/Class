import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDTO, LoginResponseDTO } from "./dto/login.dto";
import { ValidationPipe } from "../../common/pipes/validation.pipe";
import { RegisterValidationSchema } from "./schemas/register.schema";
import { RegisterRequestDTO } from "./dto/register.dto";
import { Constants } from "../../common/constants";
import { LoginValidationSchema } from "./schemas/login.schema";

@Controller('/')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}
    
    @Post(Constants.Endpoint.Auth.REGISTER)
    public register(@Body(new ValidationPipe(RegisterValidationSchema)) body: RegisterRequestDTO): Promise<void> {
        return this._authService.register(body);
    }

    @Post(Constants.Endpoint.Auth.LOGIN)
    @HttpCode(200)
    public login(@Body(new ValidationPipe(LoginValidationSchema)) body: LoginRequestDTO): Promise<LoginResponseDTO> {
        return this._authService.login(body);
    }

    @Post(Constants.Endpoint.Auth.LOGIN_GOOGLE)
    public loginWithGoogle(): Promise<LoginResponseDTO> {
        return this._authService.loginWithGoogle(body);
    }
}