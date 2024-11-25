import { Module } from '@nestjs/common';
import { RemovalService } from '../../services/removal/removal.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { RemovalController } from '../../controllers/removal/removal.controller';

@Module({
    providers: [RemovalService, PrismaService],
    controllers: [RemovalController],
    exports: [RemovalService],
})
export class RemovalModule {}
