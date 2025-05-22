import { IsEnum } from "class-validator";
import { TeacherRole } from "../entities/teacher.entity";

export class CreateTeacherDto {
  first_name: string;
  last_name: string;
  email: string;
  new_password: string;
  confirm_password: string;
  phone: string;
  @IsEnum(TeacherRole)
  role: TeacherRole;
}
