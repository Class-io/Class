import { Command, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Logger } from '../../../common/utils/logger';
import { CreateCourseDTO } from '../../models/course/dto/create.dto';
import { Constants } from '../../../common/constants';
import { IUser } from '../../models/user/interfaces/IUser';
import { UserRepository } from '../../models/user/user.repository';
import { CourseRepository } from '../../models/course/course.repository';

@Injectable()
export class CourseSeeder {
    private _fakeData: CreateCourseDTO;

    constructor(private readonly _courseRepository: CourseRepository, private readonly _userRepository: UserRepository) {}

    @Command({ command: 'seed:course', describe: 'Create new course', autoExit: true })
    public async run(@Option({ name: 'email', alias: 'e', type: 'string' }) email: string): Promise<void> {
        this._generateFakeData();

        await this._changeAuthorDataIfEmailIsProvided(email);

        await this._saveCourse();

        this._printSuccessMessage();
    }

    private _generateFakeData(): void {
        this._fakeData = {
            authorId: faker.random.uuid(),
            authorName: faker.internet.userName(),
            name: faker.random.words(3),
            price: faker.random.number(200),
            topic: faker.random.arrayElement(Object.values(Constants.COURSE.TOPIC)),
            level: faker.random.arrayElement(Object.values(Constants.COURSE.LEVEL)),
            description: faker.random.words(10),
            duration: faker.random.number(),
            image: 'default.png'
        };
    }

    private async _changeAuthorDataIfEmailIsProvided(email: string): Promise<void> {
        if(!email) return;

        const user = await this._getUserByEmailOrPrintErrorMessage(email);

        this._fakeData.authorId = user.id;
        this._fakeData.authorName = user.username;
    }

    private async _saveCourse(): Promise<void> {
        try {
            await this._courseRepository.create(this._fakeData);
        } catch(error) {
            Logger.red(error.message);
        }
    }

    private _printSuccessMessage(): void {
        Logger.green('Course generated successfully');
    }

    private async _getUserByEmailOrPrintErrorMessage(email: string): Promise<IUser> {
        try {
            const user = await this._userRepository.get({ email });

            if(!user) throw new Error('User with provided email does not exist');
            if(!user.isTutor) throw new Error('Only tutors can have their own courses');

            return user;
        } catch(error) {
            Logger.red(error.message);
            process.exit(0);
        }
    }
}