import { Module } from '@nestjs/common';
import { NotificationService } from 'src/services/notification/notification.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [NotificationService, PrismaService],
    exports: [NotificationService],
})
export class NotificationModule {}
