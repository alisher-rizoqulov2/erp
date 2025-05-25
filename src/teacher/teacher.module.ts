import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherResolver } from './teacher.resolver';
import { TeacherController } from './teacher.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports:[TeacherService]
})
export class TeacherModule {}
