import { Injectable } from '@nestjs/common';
import { ICloudProvider } from '../interfaces/ICloudProvider';
import { IImage } from '../interfaces/IImage';
import * as cloudinary from 'cloudinary';

@Injectable()
export class CloudinaryProvider implements ICloudProvider {
    public async uploadImage(image: IImage): Promise<void> {
        cloudinary.v2.uploader.upload_stream({ format: 'jpeg', folder: 'avatars', public_id: image.originalname }, (error) => {
            if(error) throw error;
        }).end(image.buffer);
    }

    public async removeFile(filename: string): Promise<void> {
        await cloudinary.v2.uploader.destroy(filename, (error) => {
            if(error) throw error;
        });
    }
}