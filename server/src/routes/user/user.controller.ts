import { Controller, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Constants } from '../../common/constants';
import { IImage } from '../../services/image/interfaces/IImage';

@Controller('/')
export class UserController {
    @Put(Constants.ENDPOINT.USER.AVATAR)
    @UseInterceptors(FileInterceptor('file'))
    public async updateAvatar(@Res() res: Response, @UploadedFile() file: IImage) {
        console.log(file);

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            res.send('Wrong file. Only jpg, jped and png allowed!');
        } else {
            res.send('Right file');
        }
    }   
}