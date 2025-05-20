import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';  // Asegúrate de importar este módulo
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // Agregar la estrategia JWT
import { JwtAuthGuard } from './jwt-auth.guard'; // Agregar el guard
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    ConfigModule.forRoot(),
    UsersModule,
  ],
  providers: [AuthService , JwtStrategy],
  exports: [JwtStrategy],  // Exporta la estrategia para usarla en otros módulos
  controllers: [AuthController],
})
export class AuthModule {}
