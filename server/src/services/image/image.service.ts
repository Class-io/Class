import { Inject, Injectable } from '@nestjs/common';
import { InvalidImageFormatException } from '../../common/exceptions/invalid-image-format.exception';
import { IImage } from './interfaces/IImage';
import { IImageProvider } from './interfaces/IImageProvider';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Injectable()
export class ImageService {
    constructor(@Inject(CloudinaryProvider) private readonly _imageProvider: IImageProvider) {}

    public async uploadImage(image: IImage): Promise<void> {
        this._validateImageFormat(image);
        this._imageProvider.uploadImage();
    }

    private _validateImageFormat(image: IImage): void {
        const imageHasSupportedType = image.originalname.match(/\.(jpg|jpeg|png)$/);
        if(!imageHasSupportedType) throw new InvalidImageFormatException();
    }
}