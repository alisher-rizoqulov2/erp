import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";
import { CoursesService } from "../courses/courses.service";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    private readonly courseServise: CoursesService
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const { course_id, start_date, end_date, name, status } = createGroupDto;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException("Invalid date format.");
    }
    if (startDate >= endDate) {
      throw new BadRequestException("Start date must be before end date.");
    }

    const course = await this.courseServise.findOne(course_id);
    if (!course) {
      throw new NotFoundException(`Course with id ${course_id} not found.`);
    }

    const newGroup = this.groupRepo.create({
      name,
      course,
      start_date: startDate,
      end_date: endDate,
      status,
    });

    return this.groupRepo.save(newGroup);
  }

  async findAll() {
    return this.groupRepo.find({ relations: ["course"] });
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ["course"],
    });
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupRepo.preload({
      id,
      ...updateGroupDto,
      start_date: updateGroupDto.start_date
        ? new Date(updateGroupDto.start_date).getTime()
        : undefined,
      end_date: updateGroupDto.end_date
        ? new Date(updateGroupDto.end_date).getTime()
        : undefined,
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    return this.groupRepo.save(group);
  }

  async remove(id: number) {
    const group = await this.groupRepo.findOneBy({ id });
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    await this.groupRepo.remove(group);
    return { message: `Group with id ${id} has been removed` };
  }
}
