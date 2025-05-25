import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTeacherGroupDto {
  @IsInt()
  @IsNotEmpty()
  teacher_id: number;

  @IsInt()
  @IsNotEmpty()
  group_id: number;
}
