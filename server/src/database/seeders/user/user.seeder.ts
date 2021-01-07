import { Command, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { random, internet } from 'faker';
import { hashString } from '../../../common/helpers/hash-string';
import { sleep } from '../../../common/helpers/sleep';
import { UserRepository } from '../../models/user/user.repository';
import { CreateUserDTO } from '../../models/user/dto/create.dto';
import { Logger } from '../../../common/utils/logger';

@Injectable()
export class UserSeeder {
    private _fakeUserData: CreateUserDTO;
    private _fakeUserDataWithHashedPassword: CreateUserDTO;

    constructor(private readonly _userRepository: UserRepository) {}

    @Command({ command: 'seed:user', describe: 'Create new user', autoExit: true })
    public async run(@Option({ name: 'tutor', alias: 't', type: 'boolean', default: false }) isTutor: boolean): Promise<void> {
        this._generateFakeData(isTutor);

        await this._createFakeDataWithHashedPassword();

        await this._saveUserAccount();

        await this._printUserCredentialsAfterSleep();
    }

    private _generateFakeData(isTutor: boolean): void {
        this._fakeUserData = {
            username: random.alphaNumeric(5),
            email: internet.email(),
            password: random.alphaNumeric(5),
            isTutor: isTutor,
            isConfirmed: true
        };
    }

    private async _createFakeDataWithHashedPassword(): Promise<void> {
        const hashedPassword = await hashString(this._fakeUserData.password);
        this._fakeUserDataWithHashedPassword = { ...this._fakeUserData, password: hashedPassword };
    }

    private async _saveUserAccount(): Promise<void> {
        try {
            await this._userRepository.create(this._fakeUserDataWithHashedPassword);
        } catch(error) {
            Logger.error(error.message);
        }
    }

    private async _printUserCredentialsAfterSleep(): Promise<void> {
        Logger.green('User generated successfully');

        await sleep(1500);

        Logger.white(this._fakeUserData);
    }
}