import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  async getTasks(dto: GetFilteredTasksDto, user: User): Promise<Task[]> {
    return this.repository.getTasks(dto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.repository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) throw new NotFoundException();
    return found;
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    return this.repository.createTask(dto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const res = await this.repository.delete({ id, userId: user.id });
    if (res.affected === 0) throw new NotFoundException();
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
