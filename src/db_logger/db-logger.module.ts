import { Module } from '@nestjs/common';

import { DbLoggerService } from './db-logger.service';
import { TraceLoggerModule } from '../trace_logger/trace-logger.module';

@Module({
  imports: [TraceLoggerModule],
  providers: [
    DbLoggerService,
    {
      provide: 'LOGGER_OPTIONS',
      useValue: true,
    },
  ],
  exports: [DbLoggerService],
})
export class DbLoggerModule {}
