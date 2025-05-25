import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../groups/entities/group.entity";

@Entity()
export class TeacherGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups)
  @JoinColumn({ name: "teacher_id" })
  teacher: Teacher;

  @ManyToOne(() => Group, (group) => group.teacherGroups) 
  @JoinColumn({ name: "group_id" })
  group: Group;
}
