import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => Student)
  createStudent(
    @Args("createStudentInput") createStudentDto: CreateStudentDto
  ) {
    return this.studentsService.create(createStudentDto);
  }

  @Query(() => [Student], { name: "students" })
  findAll() {
    return this.studentsService.findAll();
  }

  @Query(() => Student, { name: "student" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.studentsService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateStudentInput") updateStudentDto: UpdateStudentDto
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Mutation(() => Boolean)
  removeStudent(@Args("id", { type: () => Int }) id: number) {
    return this.studentsService.remove(id);
  }
}
