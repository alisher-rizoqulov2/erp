import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const { email, new_password, confirm_password } = createTeacherDto;
    if (new_password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const existingAdmin = await this.teacherRepo.findOne({ where: { email } });
    if (existingAdmin) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const password = await bcrypt.hash(new_password, 7);
    const newDto = {
      first_name: createTeacherDto.first_name,
      last_name: createTeacherDto.last_name,
      phone: createTeacherDto.phone,
      email: createTeacherDto.email,
      role: createTeacherDto.role,
      password: password,
    };

    const newTeacher = this.teacherRepo.create(newDto);
    return await this.teacherRepo.save(newTeacher);
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(id: number) {
    return this.teacherRepo.findOne({ where: { id } });
  }
  findByEmail(email: string) {
    return this.teacherRepo.findOne({ where: { email } });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    if (updateTeacherDto.new_password) {
      if (
        updateTeacherDto.new_password !== updateTeacherDto.confirm_password
      ) {
        throw new BadRequestException("Parollar mos emas");
      }
      updateTeacherDto.new_password = await bcrypt.hash(
        updateTeacherDto.new_password,
        7
      );
      delete updateTeacherDto.confirm_password;
    }
    
        return this.teacherRepo.update(id, updateTeacherDto);
  }

  remove(id: number) {
    return this.teacherRepo.delete(id)
  }
  async updateToken(id: number, data: Partial<Teacher>) {
      return this.teacherRepo.update(id, data);
    }
}
