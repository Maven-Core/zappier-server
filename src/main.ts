import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Zappier Backend')
    .setDescription('A Mini-Zappier Created For Portfolio')
    .setVersion('1.0 Alpha')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // This name must match the one used in @ApiBearerAuth('access-token')
    )
    .addSecurityRequirements('access-token')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    extraModels: [],

    // 👇 This ensures global auth appears in Swagger UI
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  app.use(
    session({
      secret: process.env.JWT_SECRET, // keep this safe
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3020);
}
bootstrap();
