import { Controller, HttpCode, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Constants } from '../../common/constants';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { IImage } from '../../services/image/interfaces/IImage';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Put(Constants.ENDPOINT.USER.AVATAR)
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtGuard)
    @HttpCode(204)
    public async updateAvatar(@Req() request: Request, @UploadedFile() image: IImage) {
        await this._userService.updateAvatar(request, image);
    }
}