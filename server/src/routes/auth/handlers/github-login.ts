import { Constants } from '../../../common/constants';
import Token from '../../../common/constants/token';
import { EmailAlreadyExistsException } from '../../../common/exceptions/email-already-exists.exception';
import { JwtService } from '../../../services/jwt/jwt.service';
import { IUser } from '../../user/interfaces/IUser';
import { UsersService } from '../../user/users.service';
import { GithubLoginRequestDTO } from '../dto/github.dto';
import { LoginResponseDTO } from '../dto/login.dto';
import { IAccessTokenPayload } from '../interfaces/IAccessTokenPayload';

export class GithubLoginHandler {
    private _user: IUser;
    constructor(private readonly _input: GithubLoginRequestDTO, private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}

    public async loginWithGithub(): Promise<LoginResponseDTO> {
        

        await this._throwExceptionWhenEmailExistsInDatabase();

        await this._createUserInDatabaseIfDoesNotExist();

        return this._createResponse();
    }


    private async _throwExceptionWhenEmailExistsInDatabase(): Promise<void> {
        this._user = await this._usersService.get({ email: this._payload.email });
        const userHasDifferentAccount = this._user && this._user.accountType !== Constants.AccountType.GITHUB;

        if(userHasDifferentAccount) throw new EmailAlreadyExistsException();
    }

    private async _createUserInDatabaseIfDoesNotExist(): Promise<void> {
       this._user = await this._usersService.get({ email: this._payload.email });
        if(!this._user) this._createUser();
    }

    private _createResponse(): LoginResponseDTO {
        const payload = this._createPayload();
        const accessToken = this._jwtService.generateToken(Token.ACCESS, payload);

        return { accessToken };
    }

    private _createPayload(): IAccessTokenPayload {
        return {
            id: this._user.id,
            username: this._user.username,
            email: this._user.email,
            isTutor: this._user.isTutor
        }
    }

    private async _createUser(): Promise<void> {
        this._user = await this._usersService.create({
            email: this._payload.email,
            username: this._payload.email,
            isConfirmed: true,
            accountType: Constants.AccountType.GITHUB
        })
    }
}