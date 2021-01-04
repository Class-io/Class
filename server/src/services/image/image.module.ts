import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
    providers: [CloudinaryProvider]
})

export class ImageModule {}