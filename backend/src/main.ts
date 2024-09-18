import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Static Assets Configs
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS Config
  const frontendUri =
    `${process.env.FRONTEND_URI}:${process.env.FRONTEND_PORT}` ||
    'http://localhost:3000';
  app.enableCors({
    origin: frontendUri,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Server Run
  const port = process.env.BACKEND_PORT || 8000;
  const backendUri = process.env.BACKEND_URI || 'http://localhost';
  await app.listen(port);

  console.log(`Server Running On: ${backendUri}:${port}`);
}

bootstrap();
