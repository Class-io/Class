import { IImage } from './IImage';

export interface IImageProvider {
    uploadImage(image: IImage): Promise<void>;
}