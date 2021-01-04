import { EventEmitter2 } from '@nestjs/event-emitter';
import { Constants } from '../../../common/constants';
import { IUserRepository } from '../../../database/models/user/interfaces/IUserRepository';
import { SendConfirmationMailRequestDTO } from '../dto/send-confirmation-mail.dto';
import { BaseAccountHandler } from './base.handler';

export class SendConfirmationMailHandler extends BaseAccountHandler {
    constructor(protected readonly _userRepository: IUserRepository, private readonly _eventEmitter: EventEmitter2) {
        super(_userRepository);
    }

    public async sendConfirmationMail(input: SendConfirmationMailRequestDTO): Promise<void> {
        const user = await this._userRepository.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsAlreadyConfirmed(user);

        this._sendConfirmationCode(user.id, user.email);
    }

    private _sendConfirmationCode(id: string, email: string): void {
        this._eventEmitter.emit(Constants.EVENT.SEND_CONFIRMATION_CODE, { id, email });
    }
}