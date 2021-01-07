import { AccountType } from './account-type';
import { AppMode } from './app-mode';
import { CourseLevel } from './course-level';
import { CourseRating } from './course-rating';
import { CourseTopic } from './course-topic';
import { DefaultException } from './default-exception';
import { Endpoint } from './endpoint';
import { Event } from './event';
import { Exception } from './exception';
import { StatusCode } from './status-code';
import { Time } from './time';
import { Token } from './token';

export const Constants = {
    ACCOUNT_TYPE: AccountType,
    APP_MODE: AppMode,
    COURSE_LEVEL: CourseLevel,
    COURSE_RATING: CourseRating,
    COURSE_TOPIC: CourseTopic,
    DEFAULT_EXCEPTION: DefaultException,
    ENDPOINT: Endpoint,
    EVENT: Event,
    EXCEPTION: Exception,
    STATUS_CODE: StatusCode,
    TIME: Time,
    TOKEN: Token
} as const;