import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import {EntityRepository,Repository} from 'typeorm'
import { CreateTaskDTO } from './dto/create-task-dto';
import { TasksFilterDto } from './dto/get-tasks-filter-dto';
import { Task } from './task-entity';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{

    async getAllWithFilteredTasks(filterDto : TasksFilterDto) : Promise<Task[]>
    {
        const query =  this.createQueryBuilder("task");
        const status = filterDto.status;
        const description = filterDto.description;
        console.log("status "+status+" description "+description);
        if(status)
        {
            query.andWhere("task.status = :status",{status})
        }

        if(description)
        {
            query.andWhere("LOWER(task.description) LIKE LOWER(:description) or LOWER(task.title) LIKE LOWER(:description)",{description : `%${description}%`})
        }
        
        const returnTask = await query.getMany();
        return returnTask;
    }

    async getTaskById(id:string): Promise<Task> 
    {
        const found = await this.findOne(id);
        if(!found)
        {
            throw new NotFoundException("Task with ID "+id+" not found");
        }         
        return found;
    }

    async createTask(createTaskDto : CreateTaskDTO) : Promise<Task> {
        const {title,description} = createTaskDto;
        const task=  this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        await this.save(task);
        return task;
    }

    async deleteTaskById(id:string): Promise<void>
    {
        //const found = await this.getTaskById(id);
        const found = this.delete(id);
        if((await found).affected === 0)
        {
            throw new NotFoundException("Task with ID "+id+" not found");
        }
    }

    async updateStatusOfTask(id:string, status:TaskStatus) : Promise<Task>
    {
        var currentTask = await this.getTaskById(id);
        currentTask.status = status;
        await this.save(currentTask); 
        return currentTask;
    }
}