import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config/swagger.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(Logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  SwaggerConfig.setup(app);

  app.useLogger(app.get(Logger));

  await app.listen(process.env.NEST_PORT ?? 3001);
  logger.log(`Server started on port ${process.env.NEST_PORT ?? 3001}`);
}

await bootstrap();
