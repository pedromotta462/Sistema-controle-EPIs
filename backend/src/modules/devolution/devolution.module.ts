import { Module } from '@nestjs/common';
import { DevolutionService } from 'src/services/devolution/devolution.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [DevolutionService, PrismaService],
    exports: [DevolutionService],
})
export class DevolutionModule {}
