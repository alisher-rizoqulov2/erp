import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../../courses/entities/course.entity";
import { TeacherGroup } from "../../teacher_groups/entities/teacher_group.entity";
import { StudentGroup } from "../../student_groups/entities/student_group.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Course, (course) => course.groups)
  @JoinColumn({ name: "course_id" })
  course: Course;
  @Column()
  start_date: Date;
  @Column()
  end_date: Date;
  @Column()
  status: string;

  // group.entity.ts
  @OneToMany(() => TeacherGroup, (teacherGroup) => teacherGroup.group)
  teacherGroups: TeacherGroup[];
  @OneToMany(() => StudentGroup, (studentGroup) => studentGroup.group)
  groups: TeacherGroup[];
  @OneToMany(() => Schedule, (schedule) => schedule.group)
  group: Schedule[];
}
