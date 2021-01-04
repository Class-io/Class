import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
    providers: [ImageService, CloudinaryProvider],
    exports: [ImageService]
})

export class ImageModule {}