import { red, green } from 'chalk';
import { Logger as NestLogger } from '@nestjs/common';

export class Logger extends NestLogger {
    private static _logger = NestLogger;

    public static log(message: string) {
        this._logger.log(message);
    }

    public static error(message: string) {
        this._logger.error(message);
    }

    public static debug(message: string) {
        this._logger.debug(message);
    }

    public static green(message: string) {
        console.log(green(message));
    }

    public static red(message: string) {
        console.log(red(message));
    }

    public static white(message: string) {
        console.log(message);
    }
}