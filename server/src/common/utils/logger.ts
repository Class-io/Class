import { red, green } from 'chalk';

class Logger {
    public green(text: string): void {
        console.log(green(text));
    }

    public red(text: string): void {
        console.log(red(text));
    }
}

export const logger = new Logger();