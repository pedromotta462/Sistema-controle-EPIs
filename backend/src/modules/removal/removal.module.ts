import { Module } from '@nestjs/common';
import { RemovalService } from 'src/services/removal/removal.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [RemovalService, PrismaService],
    exports: [RemovalService],
})
export class RemovalModule {}
