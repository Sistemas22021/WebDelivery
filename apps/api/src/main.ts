/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig, { swaggerOptions } from './app/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const globalPrefix = configService.get('server.prefix');
  const port = configService.get('server.port');





  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    transform:true
  }));
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  
  SwaggerModule.setup(globalPrefix, app, swaggerConfig(app),swaggerOptions);

  await app.listen(port);


  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
