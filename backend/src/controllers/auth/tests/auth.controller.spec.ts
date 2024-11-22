import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AdminService } from '../../../services/admin/admin.service';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Prisma } from '@prisma/client';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let adminService: AdminService;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signInAdmin: jest.fn(),
            signInEmployee: jest.fn(),
          },
        },
        {
          provide: AdminService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    adminService = module.get<AdminService>(AdminService);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign in an admin', async () => {
    const signInDto = { email: 'admin@example.com', password: 'password' };
    const result = {
      access_token: 'some-token',
      user: {
        id: '1',
        nome: 'Admin',
        email: 'admin@example.com',
        senha: 'password',
        profilePicture: 'profile.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      senha: 'password',
    };
    jest.spyOn(authService, 'signInAdmin').mockResolvedValue(result);

    expect(await controller.signInAdmin(signInDto)).toBe(result);
  });

  it('should sign in an employee', async () => {
    const signInDto = { email: 'employee@example.com', password: 'password' };
    const result = {
      access_token: 'some-token',
      user: {
        id: '1',
        nome: 'Employee',
        email: 'employee@example.com',
        senha: 'password',
        profilePicture: 'profile.jpg',
        cargo: 'Employee',
        dataContratacao: new Date(),
      },
    };
    jest.spyOn(authService, 'signInEmployee').mockResolvedValue(result);

    expect(await controller.signInEmployee(signInDto)).toBe(result);
  });

  it('should sign up an admin', async () => {
    const signUpAdminDto: Prisma.AdminCreateInput = {
      email: 'admin@example.com',
      nome: 'Admin',
      senha: 'password',
    };
    const result = {
      id: '1',
      email: 'admin@example.com',
      nome: 'Admin',
      senha: 'password',
      profilePicture: 'profile.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(adminService, 'create').mockResolvedValue(result);

    expect(await controller.signUpAdmin(signUpAdminDto)).toBe(result);
  });

  it('should sign up an employee', async () => {
    const signUpEmployeeDto: Prisma.FuncionarioCreateInput = {
      email: 'employee@example.com',
      nome: 'Employee',
      senha: 'password',
      cargo: 'Employee',
    };
    const result = {
      id: '1',
      email: 'employee@example.com',
      nome: 'Employee',
      senha: 'password',
      profilePicture: 'profile.jpg',
      cargo: 'Employee',
      dataContratacao: new Date(),
    };
    jest.spyOn(employeeService, 'create').mockResolvedValue(result);

    expect(await controller.signUp(signUpEmployeeDto)).toBe(result);
  });
});