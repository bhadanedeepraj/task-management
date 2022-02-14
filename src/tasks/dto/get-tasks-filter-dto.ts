import { IsEnum, IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus  } from "../task-status.enum";

export class TasksFilterDto{
  
    @IsOptional()
    @IsEnum(TaskStatus)
    status? : TaskStatus;

    @IsOptional()
    @IsString()
    description? : string;
}