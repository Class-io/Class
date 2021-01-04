import { Injectable } from "@nestjs/common";
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';
import { SendConfirmationMailRequestDTO } from './dto/send-confirmation-mail.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ChangePasswordRequestDTO } from './dto/change-password.dto';
import { Request } from 'express';
import { ResetPasswordRequestDTO } from './dto/reset-password.dto';
import { SendConfirmationMailHandler } from './handlers/send-confirmation-mail.handler';
import { ConfirmEmailHandler } from './handlers/confirm-email.handler';
import { ResetPasswordHandler } from './handlers/reset-password.handler';
import { ChangePasswordHandler } from './handlers/change-password.handler';
import { IUserRepository } from '../../database/models/user/interfaces/IUserRepository';

@Injectable()
export class AccountService {
    constructor(private readonly _userRepository: IUserRepository, private readonly _eventEmitter: EventEmitter2) {}

    public async sendConfirmationMail(input: SendConfirmationMailRequestDTO): Promise<void> {
        await new SendConfirmationMailHandler(this._userRepository, this._eventEmitter).sendConfirmationMail(input);
    }

    public async confirmEmail(input: ConfirmEmailRequestDTO): Promise<void> {
        await new ConfirmEmailHandler(this._userRepository).confirmEmail(input);
    }

    public async resetPassword(input: ResetPasswordRequestDTO): Promise<void> {
        await new ResetPasswordHandler(this._userRepository).resetPassword(input);
    }

    public async changePassword(request: Request, input: ChangePasswordRequestDTO): Promise<void> {
        await new ChangePasswordHandler(this._userRepository).changePassword(request, input);
    }
}