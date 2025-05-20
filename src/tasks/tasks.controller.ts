// src/tasks/tasks.controller.ts
import { Controller, Post, Body,Get,Put,Delete,Param, UseGuards, Request, HttpCode,HttpStatus, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)  // Aplica el guard a todas las rutas dentro de este controlador
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const userId = req.user.userId;
    const isCompleted = createTaskDto.isCompleted ?? false;
    return this.tasksService.create(userId, createTaskDto.description, isCompleted);
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    return this.tasksService.findAllByUser(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.tasksService.update(userId, +id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @Request() req,
  ) {
    const userId = req.user.userId;
    await this.tasksService.remove(userId, +id);
    return { message: 'Tarea eliminada' };
  }
}
