import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './config/pino.config.js';
import { validationSchema } from './config/validation.schema.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { PrismaService } from './modules/prisma/prisma.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './modules/auth/filters/prisma-exception.filter.js';
import { UserModule } from './modules/user/user.module.js';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
    LoggerModule.forRoot(pinoConfig()),
    PrismaModule,
    AuthModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}
