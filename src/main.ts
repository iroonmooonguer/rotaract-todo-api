import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir peticiones desde el frontend en localhost:5173
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // si usas cookies o autenticación
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
