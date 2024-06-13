import { Module } from '@nestjs/common';
import { EpiService } from '../../services/epi/epi.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  providers: [EpiService, PrismaService],
  exports: [EpiService],
})
export class EpiModule {}
