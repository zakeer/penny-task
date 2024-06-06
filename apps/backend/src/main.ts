import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { API } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = API.PREFIX;
  app.setGlobalPrefix(globalPrefix);
  initSwagger({ globalPrefix, app })

  const port = process.env.PORT || 3000;

  app.enableCors({
    "origin": "*",
    "methods": "*",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

function initSwagger({ globalPrefix, app }) {
  const config = new DocumentBuilder()
    .setTitle(API.NAME)
    .setVersion(API.VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);
}

bootstrap();
