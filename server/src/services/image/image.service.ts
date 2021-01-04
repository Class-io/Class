import { Inject, Injectable } from '@nestjs/common';
import { IImage } from './interfaces/IImage';
import { IImageProvider } from './interfaces/IImageProvider';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Injectable()
export class ImageService {
    constructor(@Inject(CloudinaryProvider) private readonly _imageProvider: IImageProvider) {}

    public async uploadImage(): Promise<void> {
        this._imageProvider.uploadImage();
    }

    private _validateImageFormat(image: IImage): void {
        
    }
}