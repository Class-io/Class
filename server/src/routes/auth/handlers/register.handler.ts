import { EventEmitter2 } from '@nestjs/event-emitter';
import { Constants } from '../../../common/constants';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import { UsernameAlreadyExistsException } from '../../../common/exceptions/username-already-exists.exception';
import { hashString } from '../../../common/helpers/hash-string';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { RegisterRequestDTO } from '../dto/register.dto';

export class RegisterHandler {
    private _user: IUser;

    constructor(private readonly _usersService: UsersService, private readonly _eventEmitter: EventEmitter2) {}

    public async register(input: RegisterRequestDTO): Promise<void> {
        await this._throwExceptionWhenEmailExistsInDatabase(input.email);
        
        await this._throwExceptionWhenUsernameExistsInDatabase(input.username);

        await this._createUserInDatabase(input);

        this._sendConfirmationCode();
    }

    private async _throwExceptionWhenEmailExistsInDatabase(email: string): Promise<void> {
        const user = await this._usersService.get({ email });
        if(user) throw new EmailAlreadyExistsException();
    }

    private async _throwExceptionWhenUsernameExistsInDatabase(username: string): Promise<void> {
        const user = await this._usersService.get({ username });
        if(user) throw new UsernameAlreadyExistsException();
    }

    private async _createUserInDatabase(input: RegisterRequestDTO): Promise<void> {
        const hashedPassword = await hashString(input.password);
        this._user = await this._usersService.create({ ...input, password: hashedPassword });
    }
    
    private _sendConfirmationCode(): void {
        this._eventEmitter.emit(Constants.Event.SEND_CONFIRMATION_CODE, { id: this._user.id, email: this._user.email });
    }
}