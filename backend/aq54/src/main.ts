import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes = router.stack
    .filter(r => r.route)
    .map(r => r.route.path);
  Logger.log(`Available routes: ${availableRoutes}`);
}
bootstrap();

