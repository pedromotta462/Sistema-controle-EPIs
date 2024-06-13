import { Module } from '@nestjs/common';
import { AdminController } from 'src/controllers/admin/admin.controller';
import { AdminService } from 'src/services/admin/admin.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
    providers: [AdminService, PrismaService],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminModule {}
