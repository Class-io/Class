import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/models/user/user.repository';
import { ImageService } from '../../services/image/image.service';
import { IImage } from '../../services/image/interfaces/IImage';
import { Request } from 'express';

@Injectable()
export class UserService {
    constructor(private readonly _imageService: ImageService, private readonly _userRepository: UserRepository) {}

    public async updateAvatar(request: Request, image: IImage): Promise<void> {
        const imageName = await this._imageService.uploadImage(image);

        await this._userRepository.updateById(request.user.id, { avatar: imageName })
    }
}