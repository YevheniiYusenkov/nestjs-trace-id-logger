import { ClsService } from 'nestjs-cls';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { performance } from 'perf_hooks';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
};

function colored(text: string, color: string) {
  return `${color}${text}${colors.green}`;
}

@Injectable()
export class TraceLoggerService extends ConsoleLogger {
  private startTime = performance.now();

  constructor(private readonly cls: ClsService) {
    super();
  }

  log(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? colored(`[Trace ID: ${this.cls.get('traceId')}]`, colors.blue) : '';
    const perfomancePostfix = colored(`+${(performance.now() - this.startTime).toFixed(0)}ms`, colors.yellow);
    super.log(`${traceIdPrefix} ${message} ${perfomancePostfix}`, ...optionalParams);
    this.startTime = performance.now();
  }

  error(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? colored(`[Trace ID: ${this.cls.get('traceId')}]`, colors.blue) : '';
    const perfomancePostfix = colored(`+${(performance.now() - this.startTime).toFixed(0)}ms`, colors.yellow);
    super.error(`${traceIdPrefix} ${message} ${perfomancePostfix}`, ...optionalParams);
    this.startTime = performance.now();
  }

  warn(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? colored(`[Trace ID: ${this.cls.get('traceId')}]`, colors.blue) : '';
    const perfomancePostfix = colored(`+${(performance.now() - this.startTime).toFixed(0)}ms`, colors.yellow);
    super.warn(`${traceIdPrefix} ${message} ${perfomancePostfix}`, ...optionalParams);
    this.startTime = performance.now();
  }

  debug(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? colored(`[Trace ID: ${this.cls.get('traceId')}]`, colors.blue) : '';
    const perfomancePostfix = colored(`+${(performance.now() - this.startTime).toFixed(0)}ms`, colors.yellow);
    super.debug(`${traceIdPrefix} ${message} ${perfomancePostfix}`, ...optionalParams);
    this.startTime = performance.now();
  }

  verbose(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? colored(`[Trace ID: ${this.cls.get('traceId')}]`, colors.blue) : '';
    const perfomancePostfix = colored(`+${(performance.now() - this.startTime).toFixed(0)}ms`, colors.yellow);
    super.verbose(`${traceIdPrefix} ${message} ${perfomancePostfix}`, ...optionalParams);
    this.startTime = performance.now();
  }
}
