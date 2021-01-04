import { Controller, HttpCode, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Constants } from '../../common/constants';
import { IImage } from '../../services/image/interfaces/IImage';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Put(Constants.ENDPOINT.USER.AVATAR)
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(204)
    public async updateAvatar(@UploadedFile() image: IImage) {
        await this._userService.updateAvatar(image);
    }   
}