import { Module } from '@nestjs/common';
import { NotificationController } from 'src/controllers/notification/notification.controller';
import { NotificationService } from 'src/services/notification/notification.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [NotificationService, PrismaService],
    controllers: [NotificationController],
    exports: [NotificationService],
})
export class NotificationModule {}
