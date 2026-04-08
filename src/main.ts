import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  //Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si llegan propiedades extra
      transform: true, // convierte automaticamente los tipos 
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
