import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), passportModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
