import { Module } from '@nestjs/common';
import { UsersModule } from '../database/models/user/user.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [UsersModule],
  providers: [TasksService],
})

export class TasksModule {}