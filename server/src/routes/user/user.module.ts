import { Module } from '@nestjs/common';
import { UserModelModule } from '../../database/models/user/user.model.module';
import { FileModule } from '../../services/file/file.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [FileModule, UserModelModule],
    providers: [UserService],
    controllers: [UserController]
})

export class UserModule {}