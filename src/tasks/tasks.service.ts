import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
//import { v4 as uuid1 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task-dto';
import { TasksFilterDto } from './dto/get-tasks-filter-dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task-entity';

@Injectable()
export class TasksService {

    @InjectRepository(TasksRepository)
    private tasksRepository : TasksRepository;
    //private tasks: Task[] = [];

    getAllWithFilteredTasks(filterDto : TasksFilterDto) : Promise<Task[]>
    {
        return this.tasksRepository.getAllWithFilteredTasks(filterDto);
    }
/*
    getAllTasks() : Task[]
    {
        return this.tasks;
    }

    getFilteredTasks(filterDto : TasksFilterDto) : Task[]
    {
        let allTasks = this.getAllTasks();
        let search = filterDto.status;
        let description = filterDto.description;
        if(search)
        {
            allTasks = allTasks.filter(item => item.status === filterDto.status);
        }
        if(description)
        {
            allTasks = allTasks.filter(item => {return item.description.indexOf(description)>0? item:null});
        }
        return allTasks;
    }
*/
createTask(createTaskDto : CreateTaskDTO) : Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
}
/*
    createTask(createTaskDto : CreateTaskDTO) : Task {
        const {title,description} = createTaskDto;

        const task: Task = {
            'id':uuid1(),
            title,
            description,
            status : TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }
    */
    async getTaskById(id:string): Promise<Task> 
    {
        const found = await this.tasksRepository.findOne(id);
        if(!found)
        {
            throw new NotFoundException('Task with ID "${id}" not found');
        }         
        return found;
    }
   /*
    getTaskById(id:string): Task
    {
        const task:Task = this.tasks.find(task => task.id === id)

        if(!task)
        {
            throw new NotFoundException;
        }

        return task;
    }
*/
    deleteTaskById(id:string) : Promise<void>
    {
        return this.tasksRepository.deleteTaskById(id);
    }
/*
    deleteTaskById(id:string): Task[]
    {
        this.getTaskById(id);
        this.tasks  = this.tasks.filter(task => task.id !== id)
        return this.tasks;
    }
*/
    updateStatusOfTask(id:string, status:TaskStatus) : Promise<Task>
    {
        return this.tasksRepository.updateStatusOfTask(id, status);
    }
/*
    updateStatusOfTask(id:string, status:TaskStatus) : Task
    {
        //var currentTask = this.tasks.find(task => task.id === id);
        var currentTask = this.getTaskById(id);
        currentTask.status = status;
        //var currentTask = this.tasks.findIndex(task => task.id === id);
        //this.tasks[currentTask].status = status;
        return currentTask;
    }
    */
}
