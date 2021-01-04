import { EventEmitter2 } from '@nestjs/event-emitter';
import { Constants } from '../../../common/constants';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import { UsernameAlreadyExistsException } from '../../../common/exceptions/username-already-exists.exception';
import { hashString } from '../../../common/helpers/hash-string';
import { IUser } from '../../../database/models/user/interfaces/IUser';
import { IUserRepository } from '../../../database/models/user/interfaces/IUserRepository';
import { RegisterRequestDTO } from '../dto/register.dto';

export class RegisterHandler {
    private _user: IUser;

    constructor(private readonly _userRepository: IUserRepository, private readonly _eventEmitter: EventEmitter2) {}

    public async register(input: RegisterRequestDTO): Promise<void> {
        await this._throwExceptionWhenEmailExistsInDatabase(input.email);
        
        await this._throwExceptionWhenUsernameExistsInDatabase(input.username);

        await this._createUserInDatabase(input);

        this._sendConfirmationCode();
    }

    private async _throwExceptionWhenEmailExistsInDatabase(email: string): Promise<void> {
        const user = await this._userRepository.get({ email });
        if(user) throw new EmailAlreadyExistsException();
    }

    private async _throwExceptionWhenUsernameExistsInDatabase(username: string): Promise<void> {
        const user = await this._userRepository.get({ username });
        if(user) throw new UsernameAlreadyExistsException();
    }

    private async _createUserInDatabase(input: RegisterRequestDTO): Promise<void> {
        const hashedPassword = await hashString(input.password);
        this._user = await this._userRepository.create({ ...input, password: hashedPassword });
    }
    
    private _sendConfirmationCode(): void {
        this._eventEmitter.emit(Constants.EVENT.SEND_CONFIRMATION_CODE, { id: this._user.id, email: this._user.email });
    }
}