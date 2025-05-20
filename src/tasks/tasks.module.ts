// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),   // registra la entidad Task
  ],
  providers: [
    TasksService,                       // provee el servicio
  ],
  controllers: [
    TasksController,                    // monta el controlador
  ],
})
export class TasksModule {}
