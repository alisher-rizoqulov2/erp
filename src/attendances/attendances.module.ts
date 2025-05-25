import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { StudentsModule } from '../students/students.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
  imports:[TypeOrmModule.forFeature([Attendance]),StudentsModule,SchedulesModule],
  controllers: [AttendancesController],
  providers: [AttendancesService],
})
export class AttendancesModule {}
