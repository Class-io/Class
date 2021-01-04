import { Injectable } from '@nestjs/common';
import { ICloudProvider } from '../interfaces/ICloudProvider';
import { IImage } from '../interfaces/IImage';

@Injectable()
export class CloudinaryProvider implements ICloudProvider {
    public async uploadImage(image: IImage): Promise<void> {
        console.log('Uploaded!');
    }
}