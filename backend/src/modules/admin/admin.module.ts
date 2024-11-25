import { Module } from '@nestjs/common';
import { AdminController } from '../../controllers/admin/admin.controller';
import { AdminService } from '../../services/admin/admin.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
    providers: [AdminService, PrismaService],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminModule {}
