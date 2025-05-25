import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teacher } from "./entities/teacher.entity";

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => Teacher)
  createTeacher(
    @Args("createTeacherInput") createTeacherDto: CreateTeacherDto
  ) {
    return this.teacherService.create(createTeacherDto);
  }

  @Query(() => [Teacher], { name: "teachers" })
  findAll() {
    return this.teacherService.findAll();
  }

  @Query(() => Teacher, { name: "teacher" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.teacherService.findOne(id);
  }

  @Mutation(() => Teacher)
  updateTeacher(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateTeacherInput") updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Mutation(() => Boolean)
  removeTeacher(@Args("id", { type: () => Int }) id: number) {
    return this.teacherService.remove(id);
  }
}
