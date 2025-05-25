import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { TeacherGroupsService } from "./teacher_groups.service";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";
import { TeacherGroup } from "./entities/teacher_group.entity";

@Resolver(() => TeacherGroup)
export class TeacherGroupsResolver {
  constructor(private readonly teacherGroupsService: TeacherGroupsService) {}

  @Mutation(() => TeacherGroup)
  createTeacherGroup(
    @Args("createTeacherGroupInput")
    createTeacherGroupDto: CreateTeacherGroupDto
  ) {
    return this.teacherGroupsService.create(createTeacherGroupDto);
  }

  @Query(() => [TeacherGroup], { name: "teacherGroups" })
  findAll() {
    return this.teacherGroupsService.findAll();
  }

  @Query(() => TeacherGroup, { name: "teacherGroup" })
  findOne(@Args("id", { type: () => ID }) id: number) {
    return this.teacherGroupsService.findOne(id);
  }

  @Mutation(() => TeacherGroup)
  updateTeacherGroup(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateTeacherGroupInput")
    updateTeacherGroupDto: UpdateTeacherGroupDto
  ) {
    return this.teacherGroupsService.update(id, updateTeacherGroupDto);
  }

  @Mutation(() => Number)
  removeTeacherGroup(@Args("id", { type: () => ID }) id: number) {
    return this.teacherGroupsService.remove(id);
  }
}
