import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, firstName?: string, lastName?: string, phone?: string): Promise<any> {
    
    // Validar que email y password sean proporcionados
    if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Verificar si el email ya está en uso
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email is already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      firstName, // Agregar firstName
      lastName,  // Agregar lastName
      phone,     // Agregar phone
    });
    await this.usersRepository.save(user);
  
    return this.generateJwt(user);
  }
  

  async login(email: string, password: string): Promise<any> {
    // Validar que email y password sean proporcionados
    if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return this.generateJwt(user);
  }

  private generateJwt(user: User) {
    const payload = { email: user.email, sub: user.id };
    const expiresIn = process.env.JWT_EXPIRES_IN;  // Asegúrate de que JWT_EXPIRES_IN esté en el archivo .env

    // Agrega este console.log para verificar que el JWT_SECRET se está leyendo correctamente
    console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Verifica el valor
    console.log('JWT_EXPIRES_IN:', expiresIn);  // Verifica el valor

    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn }),
    };
  }
}
