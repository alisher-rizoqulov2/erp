import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from "@nestjs/jwt";
import { TeacherModule } from '../teacher/teacher.module';


@Module({
  imports: [JwtModule.register({ global: true }), AdminModule,TeacherModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
