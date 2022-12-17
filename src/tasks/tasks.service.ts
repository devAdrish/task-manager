import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTasksDto } from './dto/get-filtered-tasks.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private repository: TaskRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getFilteredTasks(dto: GetFilteredTasksDto): Task[] {
  //   const { status, search } = dto;
  //   const tasks = this.getAllTasks();
  //   if (search && status) {
  //     const filtered = tasks.filter(
  //       (t) => t.title.includes(search) || t.description.includes(search),
  //     );
  //     return filtered.filter((t) => t.status === status);
  //   }
  //   if (status) {
  //     return tasks.filter((t) => t.status === status);
  //   }
  //   if (search) {
  //     return tasks.filter(
  //       (t) => t.title.includes(search) || t.description.includes(search),
  //     );
  //   }
  // }
  async getTaskById(id: number): Promise<Task> {
    const found = await this.repository.findOne({ id });
    if (!found) throw new NotFoundException();
    return found;
  }
  // createTask(dto: CreateTaskDto) {
  //   const { title, description } = dto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
