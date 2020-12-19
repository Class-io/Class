import { Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';
import { UserNotFoundException } from '../../common/exceptions/user-not-found-exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { EmailAlreadyConfirmedException } from '../../common/exceptions/email-already-confirmed.exception';
import { IUser } from '../user/interfaces/IUser';
import { SendConfirmationMailRequestDTO } from './dto/send-confirmation-mail.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Constants } from '../../common/constants';
import { ChangePasswordRequestDTO } from './dto/change-password.dto';
import { Request } from 'express';
import { EmailNotConfirmedException } from '../../common/exceptions/email-not-confirmed.exception';
import { compareStringToHash } from '../../common/helpers/compare-string-to-hash';
import { InvalidCredentialsException } from '../../common/exceptions/invalid-credentials.exception';
import { hashString } from '../../common/helpers/hash-string';
import { ResetPasswordRequestDTO } from './dto/reset-password.dto';

@Injectable()
export class AccountService {
    constructor(private readonly _usersSerivce: UsersService,  private readonly _eventEmitter: EventEmitter2) {}

    public async sendConfirmationMail(input: SendConfirmationMailRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsAlreadyConfirmed(user);

        this._sendConfirmationCode(user.id, user.email);
    }

    public async confirmEmail(input: ConfirmEmailRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsAlreadyConfirmed(user);

        this._throwExceptionWhenConfirmationCodeIsInvalid(user, input.code);

        this._throwExceptionWhenConfirmationCodeIsExpired(user);

        await this._confirmEmailInDatabase(user);
    }

    public async resetPassword(input: ResetPasswordRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });

        this._throwExceptionWhenUserDoesNotExist(user);

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsNotConfirmed(user)

        this._throwExceptionWhenConfirmationCodeIsInvalid(user, input.code);

        this._throwExceptionWhenConfirmationCodeIsExpired(user);

        await this._updatePasswordInDatabase(user.id, input.password);
    }

    public async changePassword(request: Request, input: ChangePasswordRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ _id: request.user.id });

        this._throwExceptionWhenAccountIsFromSocialMedia(user);

        this._throwExceptionWhenEmailIsNotConfirmed(user);

        await this._throwExceptionWhenPasswordIsInvalid(input.password, user.password);

        await this._updatePasswordInDatabase(user.id, input.newPassword);
    }

    private _throwExceptionWhenUserDoesNotExist(user: IUser | null): void {
        if(!user) throw new UserNotFoundException();
    }

    private _throwExceptionWhenAccountIsFromSocialMedia(user: IUser): void {
        if(user.isSocialMediaAccount) throw new InvalidAccountTypeException();
    }

    private _throwExceptionWhenEmailIsAlreadyConfirmed(user: IUser): void {
        if(user.isConfirmed) throw new EmailAlreadyConfirmedException();
    }

    private _throwExceptionWhenEmailIsNotConfirmed(user: IUser): void {
        if(!user.isConfirmed) throw new EmailNotConfirmedException();
    }

    private _throwExceptionWhenConfirmationCodeIsInvalid(user: IUser, code: string): void {
        if(user.confirmationCode.code !== code) throw new InvalidConfirmationCodeException();
    }

    private _throwExceptionWhenConfirmationCodeIsExpired(user: IUser): void {
        if(Date.now() > user.confirmationCode.expiresAt) throw new ExpiredConfirmationCodeException();
    }

    private async _throwExceptionWhenPasswordIsInvalid(password: string, hashedPassword: string): Promise<void> {
        const isPasswordValid = await compareStringToHash(password, hashedPassword);
        if(!isPasswordValid) throw new InvalidCredentialsException();
    }

    private async _confirmEmailInDatabase(user: IUser): Promise<void> {
        await this._usersSerivce.updateById(user.id, { confirmationCode: { code: '', expiresAt: Date.now() }, isConfirmed: true });
    }

    private async _updatePasswordInDatabase(id: string, password: string): Promise<void> {
        const hashedPassword = await hashString(password);
        await this._usersSerivce.updateById(id, { password: hashedPassword });
    }

    private _sendConfirmationCode(id: string, email: string): void {
        this._eventEmitter.emit(Constants.Event.SEND_CONFIRMATION_CODE, { id, email });
    }
}