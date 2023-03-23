import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BalanceDb } from '../entities/balance.db';

@Injectable()
export class BalanceRepository {
  constructor(@InjectRepository(BalanceDb) private readonly repository: Repository<BalanceDb>) {}

  public async getBalance(userId: string): Promise<BalanceDb> {
    return await this.repository.findOne({ where: { userId } });
  }
}
