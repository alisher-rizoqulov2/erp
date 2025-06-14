import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports:[TypeOrmModule.forFeature([Schedule ]),GroupsModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports:[SchedulesService]
})
export class SchedulesModule {}
