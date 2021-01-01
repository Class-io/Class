import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { logger } from '../../../common/utils/logger';
import { CreateCourseDTO } from '../../../routes/course/dto/create.dto';
import { CoursesService } from '../../../routes/course/courses.service';
import { Constants } from '../../../common/constants';

@Injectable()
export class CourseSeeder {
    private _fakeData: CreateCourseDTO;

    constructor(private readonly _coursesService: CoursesService) {}

    @Command({ command: 'seed:course', describe: 'Create new course', autoExit: true })
    public async run(): Promise<void> {
        this._generateFakeData();

        await this._saveCourse();

        this._printSuccessMessage();
    }

    private _generateFakeData(): void {
        this._fakeData = {
            authorId: faker.random.uuid(),
            authorName: faker.internet.userName(),
            name: faker.random.words(3),
            price: faker.random.number(200),
            topic: faker.random.arrayElement(Object.values(Constants.COURSE_TOPIC)),
            level: faker.random.arrayElement(Object.values(Constants.COURSE_LEVEL)),
            description: faker.random.words(10),
            duration: faker.random.number(),
            image: 'default.png'
        };
    }

    private async _saveCourse(): Promise<void> {
        try {
            await this._coursesService.create(this._fakeData);
        } catch(error) {
            logger.red(error);
        }
    }

    private _printSuccessMessage(): void {
        logger.green('Course generated successfully');
    }
}