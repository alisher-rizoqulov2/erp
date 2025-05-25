import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TeacherGroup } from "./entities/teacher_group.entity";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { GroupsService } from "../groups/groups.service";
import { TeacherService } from "../teacher/teacher.service";

@Injectable()
export class TeacherGroupsService {
  constructor(
    @InjectRepository(TeacherGroup)
    private readonly teacherGroupRepo: Repository<TeacherGroup>,

    private readonly teachersService: TeacherService,
    private readonly groupsService: GroupsService
  ) {}

  async create(createTeacherGroupDto: CreateTeacherGroupDto) {
    const { teacher_id, group_id } = createTeacherGroupDto;

    if (!teacher_id || !group_id) {
      throw new BadRequestException("teacher_id va group_id kiritilishi shart");
    }

    const teacher = await this.teachersService.findOne(teacher_id);
    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${teacher_id} not found`);
    }

    const group = await this.groupsService.findOne(group_id);
    if (!group) {
      throw new NotFoundException(`Group with id ${group_id} not found`);
    }

    const newTeacherGroup = this.teacherGroupRepo.create({
      teacher,
      group,
    });

    return this.teacherGroupRepo.save(newTeacherGroup);
  }

  async findAll() {
    return this.teacherGroupRepo.find({ relations: ["teacher", "group"] });
  }

  async findOne(id: number) {
    const teacherGroup = await this.teacherGroupRepo.findOne({
      where: { id },
      relations: ["teacher", "group"],
    });

    if (!teacherGroup) {
      throw new NotFoundException(`TeacherGroup with id ${id} not found`);
    }

    return teacherGroup;
  }

  async update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    const teacherGroup = await this.teacherGroupRepo.preload({
      id,
    });

    if (!teacherGroup) {
      throw new NotFoundException(`TeacherGroup with id ${id} not found`);
    }

    if (updateTeacherGroupDto.teacher_id) {
      const teacher = await this.teachersService.findOne(
        updateTeacherGroupDto.teacher_id
      );
      if (!teacher)
        throw new NotFoundException(
          `Teacher with id ${updateTeacherGroupDto.teacher_id} not found`
        );
      teacherGroup.teacher = teacher;
    }

    if (updateTeacherGroupDto.group_id) {
      const group = await this.groupsService.findOne(
        updateTeacherGroupDto.group_id
      );
      if (!group)
        throw new NotFoundException(
          `Group with id ${updateTeacherGroupDto.group_id} not found`
        );
      teacherGroup.group = group;
    }

    return this.teacherGroupRepo.save(teacherGroup);
  }

  async remove(id: number) {
    const teacherGroup = await this.teacherGroupRepo.findOneBy({ id });
    if (!teacherGroup) {
      throw new NotFoundException(`TeacherGroup with id ${id} not found`);
    }
    await this.teacherGroupRepo.remove(teacherGroup);
    return { message: `TeacherGroup with id ${id} has been removed` };
  }
}
