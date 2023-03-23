import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { TraceLoggerService } from './trace_logger/trace-logger.service';
import { TraceIdMiddleware } from './trace_id_middleware/trace-id.middleware';
import { ClsService } from 'nestjs-cls';
import { TraceLoggerV2 } from './trace_logger_2/trace-logger-2';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use(new TraceIdMiddleware().use);
  app.useLogger(app.get(TraceLoggerService));
  // app.useLogger(new TraceLoggerService(app.get(ClsService)));
  // app.useLogger(new TraceLoggerV2(app.get(ClsService)));
  await app.listen(3000);
}
bootstrap();
