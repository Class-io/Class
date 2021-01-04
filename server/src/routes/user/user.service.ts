import { Injectable } from '@nestjs/common';
import { ImageService } from '../../services/image/image.service';
import { IImage } from '../../services/image/interfaces/IImage';

@Injectable()
export class UserService {
    constructor(private readonly _imageService: ImageService) {}

    public async updateAvatar(image: IImage): Promise<void> {
        await this._imageService.uploadImage(image);
    }
}