import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { EmployeeModule } from 'src/modules/employee/employee.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EmployeeModule,
    AdminModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
