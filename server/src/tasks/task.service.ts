import { Global, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Constants } from '../common/constants';
import { Logger } from '../common/utils/logger';
import { IUser } from '../database/models/user/interfaces/IUser';
import { UserRepository } from '../database/models/user/user.repository';

@Injectable()
@Global()
export class TasksService {
    constructor(private readonly _userRepository: UserRepository) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async removeUnconfirmedUsers(): Promise<void> {
        const users = await this._userRepository.getMany({ isConfirmed: false });

        await this._deleteUsers(users);

        Logger.debug('Unconfirmed users have been removed from the database');
    }

    private async _deleteUsers(users: IUser[]): Promise<void> {
        for(const user of users) {
            if(this._accountAgeIsLongerThanTwoHours(user)) await this._userRepository.deleteById(user.id);
        }
    }

    private _accountAgeIsLongerThanTwoHours(user: IUser): boolean {
        return Date.now() - user.joinedAt > Constants.TIME.HOURS_2;
    }
}