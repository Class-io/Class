import { Inject, Injectable } from '@nestjs/common';
import { InvalidImageFormatException } from '../../common/exceptions/invalid-image-format.exception';
import { IImage } from './interfaces/IImage';
import { ICloudProvider } from './interfaces/ICloudProvider';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
    private _imageName: string;

    constructor(@Inject(CloudinaryProvider) private readonly _cloudProvider: ICloudProvider) {}

    public async uploadAvatar(image: IImage): Promise<string> {
        this._validateImageFormat(image);

        await this._prepareImage(image);

        await this._cloudProvider.uploadImage(image);

        return this._imageName;
    }

    public async removeImage(filename: string): Promise<void> {
        const filenameWithoutExtension = filename.slice(0, -4);
        await this._cloudProvider.removeFile(filenameWithoutExtension);
    }

    private _validateImageFormat(image: IImage): void {
        const imageHasSupportedType = image.originalname.match(/\.(jpg|jpeg|png)$/);
        if(!imageHasSupportedType) throw new InvalidImageFormatException();
    }

    private async _prepareImage(image: IImage): Promise<void> {
        await this._resizeImage(image);

        await this._changeImageFormatToJPEG(image);

        this._renameImage(image);
    }

    private async _resizeImage(image: IImage): Promise<void> {
        image.buffer = await sharp(image.buffer).resize(256, 256).toBuffer();
    }

    private async _changeImageFormatToJPEG(image: IImage): Promise<void> {
        image.buffer = await sharp(image.buffer).toFormat('jpeg', { quality: 75 }).toBuffer();
    }

    private _renameImage(image: IImage): void {
        const generatedName = Math.random().toString().substr(10) + Date.now();

        image.originalname = generatedName;
        this._imageName = generatedName;
    }
}