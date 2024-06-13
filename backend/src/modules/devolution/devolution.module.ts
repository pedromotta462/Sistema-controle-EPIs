import { Module } from '@nestjs/common';
import { DevolutionController } from 'src/controllers/devolution/devolution.controller';
import { DevolutionService } from 'src/services/devolution/devolution.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [DevolutionService, PrismaService],
    controllers: [DevolutionController],
    exports: [DevolutionService],
})
export class DevolutionModule {}
