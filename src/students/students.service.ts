import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";


@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly stuudentRepo: Repository<Student>
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const { email, new_password, confirm_password } = createStudentDto;
    if (new_password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const existingAdmin = await this.stuudentRepo.findOne({
      where: { email },
    });
    if (existingAdmin) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const password = await bcrypt.hash(new_password, 7);
    const newDto = {
      first_name: createStudentDto.first_name,
      last_name: createStudentDto.last_name,
      phone: createStudentDto.phone,
      email: createStudentDto.email,
      role: createStudentDto.role,
      date_of_birth: createStudentDto.date_of_birth,
      avatar_url: createStudentDto.avatar_url,
      password: password,
    };

    const newTeacher = this.stuudentRepo.create(newDto);
    return await this.stuudentRepo.save(newTeacher);
  }

  findAll() {
    return this.stuudentRepo.find();
  }

  findOne(id: number) {
    return this.stuudentRepo.findOne({ where: { id } });
  }
  findByEmail(email: string) {
    return this.stuudentRepo.findOne({ where: { email } });
  }
 async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (updateStudentDto.new_password) {
      if (updateStudentDto.new_password !== updateStudentDto.confirm_password) {
        throw new BadRequestException("Parollar mos emas");
      }
      updateStudentDto.new_password = await bcrypt.hash(
        updateStudentDto.new_password,
        7
      );
      delete updateStudentDto.confirm_password;
    }
        
            return this.stuudentRepo.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.stuudentRepo.delete(id);
  }
  async updateToken(id: number, data: Partial<Student>) {
        return this.stuudentRepo.update(id, data);
      }
}
