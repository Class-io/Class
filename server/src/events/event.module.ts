import { Module } from '@nestjs/common';
import { UserModule } from '../database/models/user/user.module';
import { MailModule } from '../services/mail/mail.module';
import { EventService } from './event.service';

@Module({
  imports: [UserModule, MailModule],
  providers: [EventService],
  exports: [EventService]
})

export class EventModule {}