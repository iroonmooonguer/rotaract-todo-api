// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Método para obtener el usuario por su email
 // En el UserService
async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
}

}
