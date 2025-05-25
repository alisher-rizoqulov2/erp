import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GroupsService } from "./groups.service";
import { Group } from "./entities/group.entity";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => Group)
  createGroup(@Args("createGroupInput") createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Query(() => [Group], { name: "groups" })
  findAll() {
    return this.groupsService.findAll();
  }

  @Query(() => Group, { name: "group" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.groupsService.findOne(id);
  }

  @Mutation(() => Group)
  updateGroup(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateGroupInput") updateGroupDto: UpdateGroupDto
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Mutation(() => String)
  removeGroup(@Args("id", { type: () => Int }) id: number) {
    return this.groupsService.remove(id);
  }
}
