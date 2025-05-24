import { IsEnum } from "class-validator";
import { GenderRole } from "../entities/student.entity";

export class CreateStudentDto {
  first_name: string;
  last_name: string;
  email: string;
  new_password: string;
  confirm_password: string;
  phone: string;
  @IsEnum(GenderRole)
  role: GenderRole;
  date_of_birth: Date;
  avatar_url: string;
}
