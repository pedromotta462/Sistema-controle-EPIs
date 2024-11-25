import { Module } from '@nestjs/common';
import { NotificationController } from '../../controllers/notification/notification.controller';
import { NotificationService } from '../../services/notification/notification.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
    providers: [NotificationService, PrismaService],
    controllers: [NotificationController],
    exports: [NotificationService],
})
export class NotificationModule {}
