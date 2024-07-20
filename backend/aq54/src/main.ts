import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes = router.stack
    .filter(r => r.route)
    .map(r => r.route.path);

  Logger.log(`Available routes: ${availableRoutes}`);
}

bootstrap();


