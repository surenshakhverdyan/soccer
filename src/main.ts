import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [configService.get<string>('BASE_URL'), 'http://localhost:5173'],
  });

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Soccer')
    .setDescription('Amateur soccer application')
    .setVersion('1.0.0')
    .addTag('Rest API')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('rest', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
