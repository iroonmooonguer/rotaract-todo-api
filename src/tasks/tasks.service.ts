// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  // Inyectamos DataSource para ejecutar SQL crudo
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    userId: number,
    description: string,
    isCompleted: boolean,
  ): Promise<Task> {
    const user = new User();
    user.id = userId;

    const task = this.tasksRepository.create({
      user,
      description,
      isCompleted,
    });
    return this.tasksRepository.save(task);
  }

  async findAllByUser(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: 'DESC' },  // Primero las más recientes/actualizadas
    });
  }

  async update(
    userId: number,
    taskId: number,
    attrs: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });
    if (!task) throw new NotFoundException('Task not found');
    Object.assign(task, attrs);
    return this.tasksRepository.save(task);
  }

  async remove(userId: number, taskId: number): Promise<void> {
    const result = await this.tasksRepository.delete({
      id: taskId,
      user: { id: userId },
    });
    if (result.affected === 0) throw new NotFoundException('Task not found');

    // Si ya no quedaron tareas, reiniciamos la secuencia de IDs a 1
    const remaining = await this.tasksRepository.count({
      where: { user: { id: userId } },
    });
    if (remaining === 0) {
      // Ajusta 'task_id_seq' si tu secuencia tiene otro nombre
      await this.dataSource.query(`ALTER SEQUENCE task_id_seq RESTART WITH 1`);
    }
  }
}

