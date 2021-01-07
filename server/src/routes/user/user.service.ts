import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/models/user/user.repository';
import { FileService } from '../../services/file/file.service';
import { IImage } from '../../services/file/interfaces/IImage';
import { Request } from 'express';
import { Constants } from '../../common/constants';

@Injectable()
export class UserService {
    constructor(private readonly _fileService: FileService, private readonly _userRepository: UserRepository) {}

    public async updateAvatar(request: Request, image: IImage): Promise<void> {
        const imageName = await this._fileService.uploadAvatar(image);

        await this._changeAvatarInDatabase(request.user.id, imageName);

        await this._removeOldAvatar(request.user.id);
    }

    private async _removeOldAvatar(id: string): Promise<void> {
        const user = await this._userRepository.get({ _id: id });

        if(user.avatar === Constants.USER.DEFAULT_AVATAR) return;

        await this._fileService.removeImage(user.avatar);
    }

    private async _changeAvatarInDatabase(id: string, imageName: string): Promise<void> {
        const avatarUrl = `avatars/${imageName}.jpg`;
        await this._userRepository.updateById(id, { avatar: avatarUrl })
    }
}