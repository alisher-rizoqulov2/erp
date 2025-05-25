import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Schedule } from "./entities/schedule.entity";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { GroupsService } from "../groups/groups.service";

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private groupsService: GroupsService 
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const group = await this.groupsService.findOne(createScheduleDto.groupId);
    if (!group) {
      throw new NotFoundException(
        `Group with id ${createScheduleDto.groupId} not found`
      );
    }

    const schedule = this.scheduleRepository.create({
      group: group,
      day_of_week: createScheduleDto.dayOfWeek,
      start_time: new Date(createScheduleDto.startTime),
      end_time: new Date(createScheduleDto.endTime),
    });

    return this.scheduleRepository.save(schedule);
  }

  async findAll() {
    return this.scheduleRepository.find({
      relations: ["group"],
    });
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ["group"],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }

    return schedule;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.findOne(id);

    if (updateScheduleDto.groupId) {
      const group = await this.groupsService.findOne(updateScheduleDto.groupId);
      if (!group) {
        throw new NotFoundException(
          `Group with id ${updateScheduleDto.groupId} not found`
        );
      }
      schedule.group = group;
    }

    if (updateScheduleDto.dayOfWeek) {
      schedule.day_of_week = updateScheduleDto.dayOfWeek;
    }

    if (updateScheduleDto.startTime) {
      schedule.start_time = new Date(updateScheduleDto.startTime);
    }

    if (updateScheduleDto.endTime) {
      schedule.end_time = new Date(updateScheduleDto.endTime);
    }

    return this.scheduleRepository.save(schedule);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    return this.scheduleRepository.remove(schedule);
  }
}
