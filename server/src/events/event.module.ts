import { Module } from '@nestjs/common';
import { UsersModule } from '../routes/user/users.module';
import { MailModule } from '../services/mail/mail.module';
import { EventService } from './event.service';

@Module({
  imports: [UsersModule, MailModule],
  providers: [EventService],
  exports: [EventService]
})

export class EventModule {}