import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailHogNotificationService } from './mailhog-notification.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'INotificationService',
      useClass: MailHogNotificationService,
    },
  ],
  exports: ['INotificationService'],
})
export class NotificationModule {}
