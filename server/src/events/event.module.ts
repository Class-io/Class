import { Module } from '@nestjs/common';
import { UserModelModule } from '../database/models/user/user.model.module';
import { MailModule } from '../services/mail/mail.module';
import { EventService } from './event.service';

@Module({
  imports: [UserModelModule, MailModule],
  providers: [EventService],
  exports: [EventService]
})

export class EventModule {}