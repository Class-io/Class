import { Response } from 'express';

export class LogoutHandler {
    public logout(response: Response): void {
        this._resetCookie(response);
    }

    private _resetCookie(response: Response): void {
        response.cookie('authorization', '', { httpOnly: true });
    }
}