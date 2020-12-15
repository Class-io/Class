import { Module } from '@nestjs/common';
import { UsersModule } from '../routes/user/users.module';
import { EventService } from './event.service';

@Module({
  imports: [UsersModule],
  providers: [EventService],
})

export class EventModule {}