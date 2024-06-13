import { Module } from '@nestjs/common';
import { RemovalService } from 'src/services/removal/removal.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RemovalController } from 'src/controllers/removal/removal.controller';

@Module({
    providers: [RemovalService, PrismaService],
    controllers: [RemovalController],
    exports: [RemovalService],
})
export class RemovalModule {}
