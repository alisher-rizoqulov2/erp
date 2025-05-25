import { IsString, IsNumber, IsDateString } from "class-validator";

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsNumber()
  course_id: number;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;

  @IsString()
  status: string;
}
