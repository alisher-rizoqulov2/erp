import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const course= this.courseRepo.create(createCourseDto);
    return await this.courseRepo.save(course)
  }

  findAll() {
    return this.courseRepo.find();
  }

  findOne(id: number) {
    return this.courseRepo.findOne({ where: { id } });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepo.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepo.delete(id);
  }
}
