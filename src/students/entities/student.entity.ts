import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentGroup } from "../../student_groups/entities/student_group.entity";

export enum GenderRole {
  MALE = "MALE",
  FEMALE = "FEMALE",    
}
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column({ default: true })
  is_active: boolean;
  @Column({
    type: "enum",
    enum: GenderRole,
  })
  role: GenderRole;
  @Column({ default: "" })
  hashed_refresh_token: string;
  @Column()
  date_of_birth: Date;
  @Column()
  avatar_url: string;

  @OneToMany(() => StudentGroup, (studentGroup) => studentGroup.student)
  student: StudentGroup[];
}
