import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CoursesService } from "./courses.service";
import { Course } from "./entities/course.entity";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => Course)
  createCourse(@Args("createCourseDto") createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Query(() => [Course], { name: "courses" })
  findAll() {
    return this.coursesService.findAll();
  }

  @Query(() => Course, { name: "course" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @Mutation(() => Course)
  updateCourse(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateCourseDto") updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Mutation(() => Boolean)
  removeCourse(@Args("id", { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }
}
