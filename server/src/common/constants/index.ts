import { AccountType } from './account-type';
import { AppMode } from './app-mode';
import { Course } from './course';
import { DefaultException } from './default-exception';
import { Endpoint } from './endpoint';
import { Event } from './event';
import { Exception } from './exception';
import { StatusCode } from './status-code';
import { Time } from './time';
import { Token } from './token';
import { User } from './user';

export const Constants = {
    ACCOUNT_TYPE: AccountType,
    APP_MODE: AppMode,
    COURSE: Course,
    DEFAULT_EXCEPTION: DefaultException,
    ENDPOINT: Endpoint,
    EVENT: Event,
    EXCEPTION: Exception,
    STATUS_CODE: StatusCode,
    TIME: Time,
    TOKEN: Token,
    USER: User
} as const;