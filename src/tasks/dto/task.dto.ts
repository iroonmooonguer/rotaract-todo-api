// src/tasks/dto/task.dto.ts

import { IsString, IsBoolean, IsOptional } from 'class-validator';  // Asegúrate de tener la validación

export class CreateTaskDto {
  @IsString() // Valida que 'description' sea una cadena de texto
  description: string;

  @IsOptional()  // Hace que el campo sea opcional
  @IsBoolean()  // Valida que 'isCompleted' sea un valor booleano
  isCompleted?: boolean;
}

