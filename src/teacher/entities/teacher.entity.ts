import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum TeacherRole {
  USTOZ = "ustoz",
  YORDAMCHI_USTOZ = "yordamchi ustoz",
}
  
@Entity()
export class Teacher {
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
    enum: TeacherRole,
    default: TeacherRole.USTOZ,
  })
  role: TeacherRole;
  @Column()
  hashed_refresh_token: string;
}
