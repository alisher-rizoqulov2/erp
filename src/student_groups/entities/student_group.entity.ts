import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../students/entities/student.entity";
import { Group } from "../../groups/entities/group.entity";

@Entity()
export class StudentGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.student)
  @JoinColumn({ name: "student_id" })
  student: Student;

  @ManyToOne(() => Group, (group) => group.group)
  @JoinColumn({ name: "group_id" })
  group: Group;
  @Column()
  period: Date;
  @Column({default:true})
  is_active: Boolean;
}
