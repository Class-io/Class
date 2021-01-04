import { Module } from '@nestjs/common';
import { UserModelModule } from '../database/models/user/user.model.module';
import { TasksService } from './task.service';

@Module({
  imports: [UserModelModule],
  providers: [TasksService],
})

export class TaskModule {}