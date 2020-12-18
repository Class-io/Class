import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ValidationPipe } from "../../common/pipes/validation.pipe";
import { Constants } from "../../common/constants";
import { AccountService } from './account.service';
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';
import { ConfirmEmailValidationSchema } from './schemas/confirm-email.schema';
import { SendConfirmationMailRequestDTO } from './dto/send-confirmation-mail.dto';
import { SendConfirmationMailValidationSchema } from './schemas/send-confirmation-mail.schema';
import { ChangePasswordValidationSchema } from './schemas/change-password.schema';
import { ChangePasswordRequestDTO } from './dto/change-password.dto';

@Controller('/')
export class AuthController {
    constructor(private readonly _accountService: AccountService) {}
    
    @Post(Constants.Endpoint.Account.SEND_CONFIRMATION_MAIL)
    @HttpCode(200)
    public sendConfirmationMail(@Body(new ValidationPipe(SendConfirmationMailValidationSchema)) body: SendConfirmationMailRequestDTO): Promise<void> {
        return this._accountService.sendConfirmationMail(body);
    }

    @Post(Constants.Endpoint.Account.CONFIRM_EMAIL)
    @HttpCode(200)
    public confirmEmail(@Body(new ValidationPipe(ConfirmEmailValidationSchema)) body: ConfirmEmailRequestDTO): Promise<void> {
        return this._accountService.confirmEmail(body);
    }

    @Post(Constants.Endpoint.Account.CHANGE_PASSWORD)
    @HttpCode(200)
    public changePassword(@Body(new ValidationPipe(ChangePasswordValidationSchema)) body: ChangePasswordRequestDTO): Promise<void> {
        return this._accountService.changePassword(body);
    }
}