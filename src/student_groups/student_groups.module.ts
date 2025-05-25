import { Module } from '@nestjs/common';
import { StudentGroupsService } from './student_groups.service';
import { StudentGroupsController } from './student_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentGroup } from './entities/student_group.entity';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';
import { StudentsModule } from '../students/students.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports:[TypeOrmModule.forFeature([StudentGroup]),StudentsModule,GroupsModule],
  controllers: [StudentGroupsController],
  providers: [StudentGroupsService],
})
export class StudentGroupsModule {}
