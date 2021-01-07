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

    public static green(message: any) {
        console.log(green(message));
    }

    public static red(message: any) {
        console.log(red(message));
    }

    public static white(message: any) {
        console.log(message);
    }
}