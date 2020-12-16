import { Injectable } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { ConfirmEmailRequestDTO } from './dto/confirm-email.dto';
import { UserNotFoundException } from '../../common/exceptions/user-not-found-exception';
import { InvalidAccountTypeException } from '../../common/exceptions/invalid-account-type.exception';
import { InvalidConfirmationCodeException } from '../../common/exceptions/invalid-confirmation-code.exception';
import { ExpiredConfirmationCodeException } from '../../common/exceptions/expired-confirmation-code.exception';
import { EmailAlreadyConfirmedException } from '../../common/exceptions/email-already-confirmed.exception';

@Injectable()
export class AuthService {
    constructor(private readonly _usersSerivce: UsersService) {}

    public async confirmEmail(input: ConfirmEmailRequestDTO): Promise<void> {
        const user = await this._usersSerivce.get({ email: input.email });

        if(!user) {
            throw new UserNotFoundException();
        }

        if(user.isSocialMediaAccount) {
            throw new InvalidAccountTypeException();
        }

        if(user.isConfirmed) {
            throw new EmailAlreadyConfirmedException();
        }

        if(user.confirmationCode.code !== input.code) {
            throw new InvalidConfirmationCodeException();
        }

        if(Date.now() > user.confirmationCode.expiresAt) {
            throw new ExpiredConfirmationCodeException();
        }

        await this._usersSerivce.updateById(user.id, { confirmationCode: { code: '', expiresAt: Date.now() }, isConfirmed: true });
    }
}