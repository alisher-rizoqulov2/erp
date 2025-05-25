import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { CoursesModule } from '../courses/courses.module';
import { GroupsResolver } from './groups.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Group]),CoursesModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports:[GroupsService]
})
export class GroupsModule {}
