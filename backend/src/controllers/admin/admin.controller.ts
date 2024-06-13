import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from '../../services/admin/admin.service';
import { Admin } from '@prisma/client';

