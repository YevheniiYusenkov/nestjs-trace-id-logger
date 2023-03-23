import { Logger, QueryRunner } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Inject, Injectable } from '@nestjs/common';

import { TraceLoggerService } from '../trace_logger/trace-logger.service';

@Injectable()
export class DbLoggerService implements Logger {
  constructor(private readonly logger: TraceLoggerService, @Inject('LOGGER_OPTIONS') private readonly options: LoggerOptions) {
    console.log('options', options);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (this.options === 'all' || this.options === true || (this.options instanceof Array && this.options.indexOf('query') !== -1)) {
      const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
      this.logger.log('query' + ': ' + sql, DbLoggerService.name);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (this.options === 'all' || this.options === true || (this.options instanceof Array && this.options.indexOf('error') !== -1)) {
      const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
      this.logger.log(`query failed: ` + sql);
      this.logger.log(`error:`, error, DbLoggerService.name);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    this.logger.log(`query is slow: ` + sql);
    this.logger.log(`execution time: ` + time, DbLoggerService.name);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('schema') !== -1)) {
      this.logger.log(message, DbLoggerService.name);
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.log(message, DbLoggerService.name);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('log') !== -1)) this.logger.log(message, DbLoggerService.name);
        break;
      case 'info':
        if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('info') !== -1)) this.logger.debug(message, DbLoggerService.name);
        break;
      case 'warn':
        if (this.options === 'all' || (this.options instanceof Array && this.options.indexOf('warn') !== -1)) this.logger.warn(message, DbLoggerService.name);
        break;
    }
  }

  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}
