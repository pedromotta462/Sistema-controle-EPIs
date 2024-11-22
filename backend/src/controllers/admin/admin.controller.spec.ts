import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from '../../services/admin/admin.service';
import { Admin, Prisma } from '@prisma/client';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an admin', async () => {
    const admin = { 
      id: '1', 
      nome: 'Admin', 
      email: 'admin@example.com', 
      senha: 'password', 
      profilePicture: 'profile.jpg', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    } as Admin;
    jest.spyOn(service, 'create').mockResolvedValue(admin);

    expect(await controller.create(admin)).toBe(admin);
  });

  it('should return all admins', async () => {
    const admins = [{ 
      id: '1', 
      nome: 'Admin', 
      email: 'admin@example.com', 
      senha: 'password', 
      profilePicture: 'profile.jpg', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }] as Admin[];
    jest.spyOn(service, 'findAll').mockResolvedValue(admins);

    expect(await controller.findAll()).toBe(admins);
  });

  it('should return one admin', async () => {
    const admin = { 
      id: '1', 
      nome: 'Admin', 
      email: 'admin@example.com', 
      senha: 'password', 
      profilePicture: 'profile.jpg', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    } as Admin;
    const where: Prisma.AdminWhereUniqueInput = { id: '1' };
    jest.spyOn(service, 'findOne').mockResolvedValue(admin);

    expect(await controller.findOne(where)).toBe(admin);
  });

  it('should update an admin', async () => {
    const admin = { 
      id: '1', 
      nome: 'Updated Admin', 
      email: 'updatedadmin@example.com', 
      senha: 'newpassword', 
      profilePicture: 'updatedprofile.jpg', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    } as Admin;
    const data: Prisma.AdminUpdateInput = { nome: 'Updated Admin' };
    const where: Prisma.AdminWhereUniqueInput = { id: '1' };
    jest.spyOn(service, 'update').mockResolvedValue(admin);

    expect(await controller.updateUser('1', data)).toBe(admin);
  });

  it('should remove an admin', async () => {
    const admin = { 
      id: '1', 
      nome: 'Admin', 
      email: 'admin@example.com', 
      senha: 'password', 
      profilePicture: 'profile.jpg', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    } as Admin;
    const where: Prisma.AdminWhereUniqueInput = { id: '1' };
    jest.spyOn(service, 'remove').mockResolvedValue(admin);

    expect(await controller.remove('1')).toBe(admin);
  });
});