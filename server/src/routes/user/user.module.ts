import { Module } from '@nestjs/common';
import { ImageModule } from '../../services/image/image.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [ImageModule],
    providers: [UserService],
    controllers: [UserController]
})

export class UserModule {}