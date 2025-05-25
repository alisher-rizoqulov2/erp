import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../students/entities/student.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Student, (student) => student.student)
  @JoinColumn({ name: "student_id" })
  student: Student;
  @ManyToOne(() => Schedule, (schedule) => schedule.schedule)
  @JoinColumn({ name: "schedule_id" })
  schedule: Schedule;
  @Column()
  date: Date;
  @Column()
  status: string;
}
