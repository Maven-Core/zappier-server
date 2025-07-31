import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Zappier Backend')
    .setDescription('A Mini-Zappier Created For Portfolio')
    .setVersion('1.0 Alpha')
    .addTag('users') // Optional: Group endpoints by tag
    .addBearerAuth() // Optional: Enable JWT support
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document); // 'api' is the Swagger UI path

  await app.listen(process.env.PORT ?? 3020);
}
bootstrap();
