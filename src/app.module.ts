import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TraceLoggerModule } from './trace_logger/trace-logger.module';

import { DbLoggerModule } from './db_logger/db-logger.module';
import { DbLoggerService } from './db_logger/db-logger.service';
import { BalanceDb } from './entities/balance.db';
import { BalanceRepository } from './repository/balance.repository';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (traceLogger: DbLoggerService) => ({
        type: 'postgres',
        host: 'host',
        port: 5432,
        username: 'username',
        password: 'password',
        database: 'database',
        synchronize: false,
        // logging: true,
        logger: traceLogger,
        entities: [BalanceDb],
      }),
      inject: [DbLoggerService],
      imports: [DbLoggerModule],
    }),
    TypeOrmModule.forFeature([BalanceDb]),
  ],
  controllers: [AppController],
  providers: [AppService, BalanceRepository],
})
export class AppModule {}
