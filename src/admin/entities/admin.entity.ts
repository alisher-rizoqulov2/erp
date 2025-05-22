import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  password: string;
  @Column()
  hashed_refresh_token: string;
  @Column({ default: false })
  is_creator: boolean;
  @Column({ default: true })
  is_active: boolean;
}
