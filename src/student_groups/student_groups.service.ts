import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";
import { StudentsService } from "../students/students.service";
import { GroupsService } from "../groups/groups.service";

@Injectable()
export class StudentGroupsService {
  constructor(
    @InjectRepository(StudentGroup)
    private readonly studentGroupRepository: Repository<StudentGroup>,

    private readonly studentsService: StudentsService,
    private readonly groupsService: GroupsService
  ) {}

  async create(createStudentGroupDto: CreateStudentGroupDto) {
    const { studentId, groupId, period, isActive } = createStudentGroupDto;

    const student = await this.studentsService.findOne(studentId);
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    const group = await this.groupsService.findOne(groupId);
    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found`);
    }

    const studentGroup = this.studentGroupRepository.create({
      student,
      group,
      period,
      is_active: isActive,
    });

    return this.studentGroupRepository.save(studentGroup);
  }

  async findAll() {
    return this.studentGroupRepository.find({
      relations: ["student", "group"],
    });
  }

  async findOne(id: number) {
    const studentGroup = await this.studentGroupRepository.findOne({
      where: { id },
      relations: ["student", "group"],
    });
    if (!studentGroup) {
      throw new NotFoundException(`StudentGroup with id ${id} not found`);
    }
    return studentGroup;
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    const studentGroup = await this.findOne(id);

    if (updateStudentGroupDto.studentId) {
      const student = await this.studentsService.findOne(
        updateStudentGroupDto.studentId
      );
      if (!student) {
        throw new NotFoundException(
          `Student with id ${updateStudentGroupDto.studentId} not found`
        );
      }
      studentGroup.student = student;
    }

    if (updateStudentGroupDto.groupId) {
      const group = await this.groupsService.findOne(
        updateStudentGroupDto.groupId
      );
      if (!group) {
        throw new NotFoundException(
          `Group with id ${updateStudentGroupDto.groupId} not found`
        );
      }
      studentGroup.group = group;
    }

    if (updateStudentGroupDto.period) {
      studentGroup.period = updateStudentGroupDto.period;
    }

    if (updateStudentGroupDto.isActive !== undefined) {
      studentGroup.is_active = updateStudentGroupDto.isActive;
    }

    return this.studentGroupRepository.save(studentGroup);
  }

  async remove(id: number) {
    const studentGroup = await this.findOne(id);
    return this.studentGroupRepository.remove(studentGroup);
  }
}
