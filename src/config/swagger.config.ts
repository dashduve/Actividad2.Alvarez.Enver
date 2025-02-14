import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('EduConnect API')
  .setDescription('API para la plataforma académica EduConnect')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  