import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
    providers: [FileService, CloudinaryProvider],
    exports: [FileService]
})

export class FileModule {}