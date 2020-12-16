import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ValidationPipe } from "../../common/pipes/validation.pipe";
import { Constants } from "../../common/constants";
import { AccountService } from './account.service';
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';
import { ConfirmEmailValidationSchema } from './schemas/confirm-email.schema';

@Controller('/')
export class AuthController {
    constructor(private readonly _accountService: AccountService) {}
    
    @Post(Constants.Endpoint.Account.CONFIRM_EMAIL)
    @HttpCode(200)
    public login(@Body(new ValidationPipe(ConfirmEmailValidationSchema)) body: ConfirmEmailRequestDTO): Promise<void> {
        return this._accountService.confirmEmail(body);
    }
}