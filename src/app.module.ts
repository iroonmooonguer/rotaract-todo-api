import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

// Imprime las variables de entorno antes de la configuración
console.log('DATABASE HOST:', process.env.DATABASE_HOST);  // Esta línea imprimirá el valor de DATABASE_HOST
console.log('DATABASE PORT:', process.env.DATABASE_PORT);  // Esta línea imprimirá el valor de DATABASE_PORT

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Asegura que las variables de entorno sean accesibles globalmente en la aplicación
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT! || 5432,  // Usamos 5432 como valor predeterminado si no está definido
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Task], 
      autoLoadEntities: true, // Asegura que las entidades se carguen automáticamente
      synchronize: true, // ¡Cuidado con esto en producción!
      //dropSchema: true,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
