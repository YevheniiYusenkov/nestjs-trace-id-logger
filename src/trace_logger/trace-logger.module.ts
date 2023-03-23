import { ClsModule } from 'nestjs-cls';
import { Module } from '@nestjs/common';

import { TraceLoggerService } from './trace-logger.service';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('traceId', req.headers['trace-id'] || 'none');
        },
      },
    }),
  ],
  providers: [TraceLoggerService],
  exports: [TraceLoggerService],
})
export class TraceLoggerModule {}
