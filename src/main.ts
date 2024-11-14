import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: configService.get<string>('BASE_URL') });

  app.use(
    '/rest-api*',
    basicAuth({
      challenge: true,
      users: {
        [configService.get<string>('SWAGGER_USER')]:
          configService.get<string>('SWAGGER_PASS'),
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Soccer')
    .setDescription('Amateur soccer application')
    .setVersion('1.0.0')
    .addTag('Rest API')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('rest-api', app, documentFactory, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(3000);
}
bootstrap();
