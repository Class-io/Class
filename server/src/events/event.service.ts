import { Global, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Constants } from '../common/constants';
import { generateConfirmationCode } from '../common/helpers/generate-confirmation-code';
import { UserRepository } from '../database/models/user/user.repository';
import { MailService } from '../providers/mail/mail.service';
import { ISendConfirmationCodeEventPayload } from './interfaces/ISendConfirmationCodeEventPayload';

@Injectable()
@Global()
export class EventService {
    private readonly logger: Logger = new Logger();
    constructor(private readonly _userRepository: UserRepository, private readonly _mailService: MailService) {}

    @OnEvent(Constants.EVENT.SEND_CONFIRMATION_CODE)
    public async sendConfirmationCode(payload: ISendConfirmationCodeEventPayload): Promise<void> {
        const confirmationCode = generateConfirmationCode();

        await this._userRepository.updateById(payload.id, { confirmationCode });

        await this._mailService.sendConfirmationCode(payload.email, confirmationCode.code);

        this.logger.debug('Confirmation code has been sent successfully');
    }
}