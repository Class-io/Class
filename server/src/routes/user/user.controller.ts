import { Controller, Put, Res } from '@nestjs/common';
import { Constants } from '../../common/constants';

@Controller('/')
export class UserController {
    @Put(Constants.ENDPOINT.USER.AVATAR)
    public async updateAvatar(@Res() res) {
        res.send('Update avatar');
    }   
}