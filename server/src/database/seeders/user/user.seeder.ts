import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { random, internet } from 'faker';
import { hashString } from '../../../common/helpers/hash-string';
import { sleep } from '../../../common/helpers/sleep';
import { UsersService } from '../../../routes/user/users.service';
import { RegisterRequestDTO } from '../../../routes/auth/dto/register.dto';
import { logger } from '../../../common/utils/logger';

@Injectable()
export class UserSeeder {
    private _fakeUserData: RegisterRequestDTO;
    private _fakeUserDataWithHashedPassword: RegisterRequestDTO;

    constructor(private readonly _usersService: UsersService) {}

    @Command({ command: 'seed:user', describe: 'Create new user', autoExit: true })
    public async run(): Promise<void> {
        this._generateFakeData();

        await this._getFakeDataWithHashedPassword();

        await this._saveUserAccount();

        await this._printFakeUserDataAfterSleep();
    }

    private _generateFakeData(): void {
        this._fakeUserData = {
            username: random.alphaNumeric(5),
            email: internet.email(),
            password: random.alphaNumeric(5)
        };
    }

    private async _getFakeDataWithHashedPassword(): Promise<void> {
        const hashedPassword = await hashString(this._fakeUserData.password);
        this._fakeUserDataWithHashedPassword = { ...this._fakeUserData, password: hashedPassword };
    }

    private async _saveUserAccount(): Promise<void> {
        try {
            await this._usersService.create(this._fakeUserDataWithHashedPassword);
        } catch(error) {
            logger.red(error);
        }
    }

    private async _printFakeUserDataAfterSleep(): Promise<void> {
        logger.green('User generated successfully');
    
        await sleep(1500);
    
        console.log({
            username: this._fakeUserData.username,
            password: this._fakeUserData.password
        });
    }
}