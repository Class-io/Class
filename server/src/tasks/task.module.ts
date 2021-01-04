import { Module } from '@nestjs/common';
import { UserModule } from '../database/models/user/user.module';
import { TasksService } from './task.service';

@Module({
  imports: [UserModule],
  providers: [TasksService],
})

export class TaskModule {}