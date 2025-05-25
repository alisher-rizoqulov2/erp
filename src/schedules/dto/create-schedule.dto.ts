import { IsNumber, IsString, IsDateString } from "class-validator";

export class CreateScheduleDto {
  @IsNumber()
  groupId: number;

  @IsString()
  dayOfWeek: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
