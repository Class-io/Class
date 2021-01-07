import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/models/user/user.repository';
import { FileService } from '../../services/file/file.service';
import { IImage } from '../../services/file/interfaces/IImage';
import { Request } from 'express';

@Injectable()
export class UserService {
    constructor(private readonly _fileService: FileService, private readonly _userRepository: UserRepository) {}

    public async updateAvatar(request: Request, image: IImage): Promise<void> {
        const imageName = await this._fileService.uploadImage(image);
        await this._changeAvatarInDatabase(request.user.id, imageName);
    }

    private async _changeAvatarInDatabase(id: string, imageName: string): Promise<void> {
        const avatarUrl = `avatars/${imageName}.jpg`;
        await this._userRepository.updateById(id, { avatar: avatarUrl })
    }
}