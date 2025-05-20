import { Module } from '@nestjs/common';
import { UsersService } from './users.service';  // Asegúrate de importar el servicio
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Registra la entidad User en TypeOrm
  providers: [UsersService],  // Proveemos el servicio
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
