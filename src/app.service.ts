import { Injectable, Logger } from '@nestjs/common';

import { BalanceRepository } from './repository/balance.repository';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly repository: BalanceRepository) {}

  getHello(): string {
    this.logger.log('getHello called');
    return 'Hello World!';
  }

  somePrivateMethod() {
    this.logger.log('somePrivateMethod called');
  }

  public async getBalance(userId: string) {
    return await this.repository.getBalance(userId);
  }
}
