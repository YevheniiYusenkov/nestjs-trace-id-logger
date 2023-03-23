import { performance } from 'perf_hooks';
import { ClsService } from 'nestjs-cls';
import { Logger } from '@nestjs/common';

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

export class TraceLoggerV2 extends Logger {
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
    const traceIdPrefix = traceId ? `[Trace ID: ${this.cls.get('traceId')}]` : '';
    super.error(`${traceIdPrefix} ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? `[Trace ID: ${this.cls.get('traceId')}]` : '';
    super.warn(`${traceIdPrefix} ${message}`, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? `[Trace ID: ${this.cls.get('traceId')}]` : '';
    super.debug(`${traceIdPrefix} ${message}`, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    const traceId = this.cls.get('traceId');
    const traceIdPrefix = traceId ? `[Trace ID: ${this.cls.get('traceId')}]` : '';
    super.verbose(`${traceIdPrefix} ${message}`, ...optionalParams);
  }
}
