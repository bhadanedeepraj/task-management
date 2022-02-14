import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDTO } from './dto/create-task-dto';
import { TasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task-entity';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService) {};

    @Get()
    getTasks(@Query()filterDto : TasksFilterDto): Promise<Task[]>
    {
        /*if(Object.keys(filterDto).length)
        {
            return this.taskService.getFilteredTasks(filterDto);
        }
        else
            return this.taskService.getAllTasks();*/

        return this.taskService.getAllWithFilteredTasks(filterDto);
    }

/*
    @Get()
    getTasks(@Query()filterDto : TasksFilterDto):Task[]
    {
        if(Object.keys(filterDto).length)
        {
            return this.taskService.getFilteredTasks(filterDto);
        }
        else
            return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body()createTaskDto: CreateTaskDTO) : Task {
        
        return this.taskService.createTask(createTaskDto);
    }
*/
    @Post()
    createTask(@Body()createTaskDto: CreateTaskDTO) : Promise<Task> {
        
        return this.taskService.createTask(createTaskDto);
    }

    @Get("/:id")
    getTaskById(@Param("id") tempid : string):Promise<Task>
    {
        return this.taskService.getTaskById(tempid);
    }
/*
    @Get("/:id")
    getTaskById(@Param("id") tempid : string):Task
    {
        return this.taskService.getTaskById(tempid);
    }
*/
    @Delete("/:id")
    deleteTaskById(@Param("id") tempid : string): Promise<void>
    {
        return this.taskService.deleteTaskById(tempid);
    }
/*
    @Delete("/:id")
    deleteTaskById(@Param("id") tempid : string):Task[]
    {
        return this.taskService.deleteTaskById(tempid);
    }
*/
    @Patch("/:id")
    updateStatusOfTask(@Body()updateTaskStatusDto : UpdateTaskStatusDto, @Param("id")id :string) : Promise<Task>
    {
        const {status} = updateTaskStatusDto;
        return this.taskService.updateStatusOfTask(id,status);
    }
/*
    @Patch("/:id")
    //updateStatusOfTask(@Body("status")status : TaskStatus, @Param("id")id :string) : Task
    updateStatusOfTask(@Body()updateTaskStatusDto : UpdateTaskStatusDto, @Param("id")id :string) : Task
    {
        const {status} = updateTaskStatusDto;
        return this.taskService.updateStatusOfTask(id,status);
    }

    */
}
