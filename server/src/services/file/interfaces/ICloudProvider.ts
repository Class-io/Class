import { IImage } from './IImage';

export interface ICloudProvider {
    uploadImage(image: IImage): Promise<void>;
    
    removeFile(filename: string): Promise<void>;
}