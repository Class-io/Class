import { Global, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IUser } from '../routes/user/interfaces/IUser';
import { UsersService } from '../routes/user/users.service';

@Injectable()
@Global()
export class TasksService {
    private readonly logger: Logger = new Logger();
    constructor(private readonly _usersSerivce: UsersService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async removeUnconfirmedUsers(): Promise<void> {
        const users = await this._usersSerivce.getMany({ isConfirmed: false });

        await this._deleteUsers(users);

        this.logger.debug('Unconfirmed users have been removed from the database');
    }

    private async _deleteUsers(users: IUser[]): Promise<void> {
        for(const user of users) {
            if(this._accountAgeIsLongerThanTwoHours(user)) await this._usersSerivce.deleteById(user.id);
        }
    }

    private _accountAgeIsLongerThanTwoHours(user: IUser): boolean {
        const HOURS_2 = 7200000
        return Date.now() - user.joinedAt > HOURS_2;
    }
}