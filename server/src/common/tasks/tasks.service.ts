import { Global, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../../routes/user/users.service';

@Injectable()
@Global()
export class TasksService {
    private readonly logger: Logger = new Logger();
    constructor(private readonly _usersSerivce: UsersService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async removeUnconfirmedUsers(): Promise<void> {
        const users = await this._usersSerivce.getMany({ isConfirmed: false });

        for(const user of users) {
            await this._usersSerivce.deleteById(user.id);
        }

        this.logger.debug('Unconfirmed users have been removed from the database');
    }
}