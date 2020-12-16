import { Global, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Constants } from '../common/constants';
import { generateConfirmationCode } from '../common/helpers/generate-confirmation-code';
import { UsersService } from '../routes/user/users.service';
import { MailService } from '../services/mail/mail.service';
import { ISendConfirmationCodeEventPayload } from './interfaces/ISendConfirmationCodeEventPayload';

@Injectable()
@Global()
export class EventService {
    private readonly logger: Logger = new Logger();
    constructor(private readonly _usersSerivce: UsersService, private readonly _mailService: MailService) {}

    @OnEvent(Constants.Event.SEND_CONFIRMATION_CODE)
    public async sendConfirmationCode(payload: ISendConfirmationCodeEventPayload): Promise<void> {
        const confirmationCode = generateConfirmationCode();

        await this._usersSerivce.updateById(payload.id, { confirmationCode });

        await this._mailService.sendConfirmationCode(payload.email, confirmationCode.code);

        this.logger.debug('Confirmation code has been sent successfully');
    }
}