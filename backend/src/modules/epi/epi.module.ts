import { Module } from '@nestjs/common';
import { EpiService } from '../../services/epi/epi.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { EpiController } from '../../controllers/epi/epi.controller';

@Module({
  providers: [EpiService, PrismaService],
  controllers: [EpiController],
  exports: [EpiService],
})
export class EpiModule {}
