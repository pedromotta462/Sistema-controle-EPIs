import { Module } from '@nestjs/common';
import { AdminService } from 'src/services/admin/admin.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [AdminService, PrismaService],
    exports: [AdminService],
})
export class AdminModule {}
