import { AppMode } from './app-mode';
import { DefaultException } from './default-exception';
import { Exception } from './exception';
import { Endpoint } from './endpoint';
import { Token } from './token';
import { Event } from './event';
import { Time } from './time';
import { AccountType } from './account-type';
import { CourseRating } from './course-rating';
import { CourseLevel } from './course-level';
import { CourseTopic } from './course-topic';

export const Constants = {
    APP_MODE: AppMode,
    DEFAULT_EXCEPTION: DefaultException,
    EXCEPTION: Exception,
    ENDPOINT: Endpoint,
    TOKEN: Token,
    EVENT: Event,
    TIME: Time,
    ACCOUNT_TYPE: AccountType,
    COURSE_RATING: CourseRating,
    COURSE_LEVEL: CourseLevel,
    COURSE_TOPIC: CourseTopic
} as const;