import { Global, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Constants } from '../common/constants';
import { generateConfirmationCode } from '../common/helpers/generate-confirmation-code';
import { UsersService } from '../routes/user/users.service';
import { MailService } from '../services/mail/mail.service';

@Injectable()
@Global()
export class TasksService {
    constructor(private readonly _usersSerivce: UsersService, private readonly _mailService: MailService) {}

    @OnEvent(Constants.Event.SEND_CONFIRMATION_CODE)
    public async sendConfirmationCode(payload: { id: string, email: string }): Promise<void> {
        const confirmationCode = generateConfirmationCode();
        this._usersSerivce.updateById(payload.id, {});

        this._mailService.sendConfirmationCode(user.email, confirmationCode);
    }
}