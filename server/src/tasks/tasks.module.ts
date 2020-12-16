import { Module } from '@nestjs/common';
import { UsersModule } from '../routes/user/users.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [UsersModule],
  providers: [TasksService],
})

export class TasksModule {}