import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { ValidationPipe } from "../../common/pipes/validation.pipe";
import { Constants } from "../../common/constants";
import { AccountService } from './account.service';
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';
import { ConfirmEmailValidationSchema } from './schemas/confirm-email.schema';
import { SendConfirmationMailRequestDTO } from './dto/send-confirmation-mail.dto';
import { SendConfirmationMailValidationSchema } from './schemas/send-confirmation-mail.schema';
import { ChangePasswordValidationSchema } from './schemas/change-password.schema';
import { ChangePasswordRequestDTO } from './dto/change-password.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { Request } from 'express';
import { ResetPasswordValidationSchema } from './schemas/reset-password.schema';
import { ResetPasswordRequestDTO } from './dto/reset-password.dto';

@Controller('/')
export class AccountController {
    constructor(private readonly _accountService: AccountService) {}
    
    @Post(Constants.ENDPOINT.ACCOUNT.SEND_CONFIRMATION_MAIL)
    @HttpCode(204)
    public async sendConfirmationMail(@Body(new ValidationPipe(SendConfirmationMailValidationSchema)) body: SendConfirmationMailRequestDTO): Promise<void> {
        await this._accountService.sendConfirmationMail(body);
    }

    @Post(Constants.ENDPOINT.ACCOUNT.CONFIRM_EMAIL)
    @HttpCode(204)
    public async confirmEmail(@Body(new ValidationPipe(ConfirmEmailValidationSchema)) body: ConfirmEmailRequestDTO): Promise<void> {
        await this._accountService.confirmEmail(body);
    }

    @Post(Constants.ENDPOINT.ACCOUNT.RESET_PASSWORD)
    @HttpCode(204)
    public async resetPassword(@Body(new ValidationPipe(ResetPasswordValidationSchema)) body: ResetPasswordRequestDTO): Promise<void> {
        await this._accountService.resetPassword(body);
    }

    @Post(Constants.ENDPOINT.ACCOUNT.CHANGE_PASSWORD)
    @HttpCode(204)
    @UseGuards(JwtGuard)
    public async changePassword(@Req() request: Request, @Body(new ValidationPipe(ChangePasswordValidationSchema)) body: ChangePasswordRequestDTO): Promise<void> {
        await this._accountService.changePassword(request, body);
    }
}