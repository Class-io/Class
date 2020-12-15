import { Global, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Constants } from '../common/constants';
import { UsersService } from '../routes/user/users.service';

@Injectable()
@Global()
export class TasksService {
    constructor(private readonly _usersSerivce: UsersService) {}

    @OnEvent(Constants.Event.SEND_CONFIRMATION_CODE)
    public async sendConfirmationCode(payload: { email: string }): Promise<void> {
        const user = await this._usersSerivce.get({ email: payload.email })

        
    }
}