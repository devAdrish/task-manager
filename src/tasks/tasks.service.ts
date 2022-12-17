import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTasksDto } from './dto/get-filtered-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private repository: TaskRepository,
  ) {}

  async getTasks(dto: GetFilteredTasksDto): Promise<Task[]> {
    return this.repository.getTasks(dto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.repository.findOne({ id });
    if (!found) throw new NotFoundException();
    return found;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return this.repository.createTask(dto);
  }

  async deleteTask(id: number): Promise<void> {
    const res = await this.repository.delete(id);
    if (res.affected === 0) throw new NotFoundException();
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
