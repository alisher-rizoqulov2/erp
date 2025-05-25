import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Attendance } from "./entities/attendance.entity";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";

import { StudentsService } from "../students/students.service";
import { SchedulesService } from "../schedules/schedules.service";

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,

    private readonly studentsService: StudentsService,
    private readonly schedulesService: SchedulesService
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const { studentId, scheduleId, date, status } = createAttendanceDto;

    const student = await this.studentsService.findOne(studentId);
    if (!student)
      throw new NotFoundException(`Student with id ${studentId} not found`);

    const schedule = await this.schedulesService.findOne(scheduleId);
    if (!schedule)
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);

    const attendance = this.attendanceRepository.create({
      student,
      schedule,
      date,
      status,
    });

    return this.attendanceRepository.save(attendance);
  }

  async findAll() {
    return this.attendanceRepository.find({
      relations: ["student", "schedule"],
    });
  }

  async findOne(id: number) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ["student", "schedule"],
    });
    if (!attendance) {
      throw new NotFoundException(`Attendance with id ${id} not found`);
    }
    return attendance;
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.findOne(id);

    if (updateAttendanceDto.studentId) {
      const student = await this.studentsService.findOne(
        updateAttendanceDto.studentId
      );
      if (!student)
        throw new NotFoundException(
          `Student with id ${updateAttendanceDto.studentId} not found`
        );
      attendance.student = student;
    }

    if (updateAttendanceDto.scheduleId) {
      const schedule = await this.schedulesService.findOne(
        updateAttendanceDto.scheduleId
      );
      if (!schedule)
        throw new NotFoundException(
          `Schedule with id ${updateAttendanceDto.scheduleId} not found`
        );
      attendance.schedule = schedule;
    }

    if (updateAttendanceDto.date) {
      attendance.date = updateAttendanceDto.date;
    }

    if (updateAttendanceDto.status) {
      attendance.status = updateAttendanceDto.status;
    }

    return this.attendanceRepository.save(attendance);
  }

  async remove(id: number) {
    const attendance = await this.findOne(id);
    return this.attendanceRepository.remove(attendance);
  }
}
