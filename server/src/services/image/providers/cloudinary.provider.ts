import { Injectable } from '@nestjs/common';
import { IImageProvider } from '../interfaces/IImageProvider';
import * as fs from 'fs';
import { IImage } from '../interfaces/IImage';

@Injectable()
export class CloudinaryProvider implements IImageProvider {
    public async uploadImage(image: IImage): Promise<void> {
        console.log('Uploaded!');
    }
}