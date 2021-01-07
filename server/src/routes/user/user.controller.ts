import { Controller, HttpCode, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Constants } from '../../common/constants';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { IImage } from '../../services/file/interfaces/IImage';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Put(Constants.ENDPOINT.USER.AVATAR)
    @HttpCode(Constants.STATUS_CODE.NO_CONTENT)
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtGuard)
    public async updateAvatar(@Req() request: Request, @UploadedFile() image: IImage): Promise<void> {
        await this._userService.updateAvatar(request, image);
    }
}