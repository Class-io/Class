import { Module } from '@nestjs/common';
import { UserModelModule } from '../../database/models/user/user.model.module';
import { ImageModule } from '../../services/image/image.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [ImageModule, UserModelModule],
    providers: [UserService],
    controllers: [UserController]
})

export class UserModule {}