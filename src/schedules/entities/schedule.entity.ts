import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";
import { Attendance } from "../../attendances/entities/attendance.entity";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Group, (group) => group.group)
  @JoinColumn({ name: "group_id" })
  group: Group;
  @Column()
  day_of_week: string;
  @Column()
  start_time: Date;
  @Column()
  end_time: Date;
  @OneToMany(() => Attendance, (attendance) => attendance.schedule)
  schedule: Attendance[];
}
