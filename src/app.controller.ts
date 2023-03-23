import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { BalanceDb } from './entities/balance.db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get('/balance/:userId')
  public async getBalance(@Param('userId') userId: string): Promise<BalanceDb> {
    return await this.appService.getBalance(userId);
  }
}
