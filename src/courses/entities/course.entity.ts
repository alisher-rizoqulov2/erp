import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  durstion: number;
  @Column()
  lessons_in_a_week: number;
  @Column()
  lesson_duration: number;

  @OneToMany(() => Group, (group) => group.course)
  groups: Group[];
}
