import { Module } from '@nestjs/common';
import { DevolutionController } from '../../controllers/devolution/devolution.controller';
import { DevolutionService } from '../../services/devolution/devolution.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
    providers: [DevolutionService, PrismaService],
    controllers: [DevolutionController],
    exports: [DevolutionService],
})
export class DevolutionModule {}
