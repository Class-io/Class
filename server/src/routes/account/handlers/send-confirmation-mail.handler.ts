import { EventEmitter2 } from '@nestjs/event-emitter';
import { Constants } from '../../../common/constants';
import { UsersService } from '../../user/users.service';
import { SendConfirmationMailRequestDTO } from '../dto/send-confirmation-mail.dto';
import { BaseAccountHandler } from './base.handler';

export class SendConfirmationMailHandler extends BaseAccountHandler {
    constructor(protected readonly _usersSerivce: UsersService, private readonly _eventEmitter: EventEmitter2) {
        super(_usersSerivce);
    }

    public async sendConfirmationMail(input: SendConfirmationMailRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsAlreadyConfirmed(user);

        this._sendConfirmationCode(user.id, user.email);
    }

    private _sendConfirmationCode(id: string, email: string): void {
        this._eventEmitter.emit(Constants.Event.SEND_CONFIRMATION_CODE, { id, email });
    }
}