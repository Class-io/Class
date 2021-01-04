import * as CloudinaryLib from 'cloudinary';

export const Cloudinary = 'lib:cloudinary';

export const CloudinaryProvider = {
    provide: Cloudinary,
    useValue: CloudinaryLib.v2,
};