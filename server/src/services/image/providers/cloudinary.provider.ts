import { Injectable } from '@nestjs/common';
import { IImageProvider } from '../interfaces/IImageProvider';

@Injectable()
export class CloudinaryProvider implements IImageProvider {
    public async uploadImage(): Promise<void> {
        console.log('Hello from cloudinary provider');
    }
}