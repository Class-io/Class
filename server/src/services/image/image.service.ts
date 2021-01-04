import { Inject, Injectable } from '@nestjs/common';
import { IImageProvider } from './interfaces/IImageProvider';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Injectable()
export class ImageService {
    constructor(@Inject(CloudinaryProvider) private readonly _imageProvider: IImageProvider) {}

    
}