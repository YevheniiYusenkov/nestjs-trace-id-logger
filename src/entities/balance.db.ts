import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'balance' })
export class BalanceDb {
  @PrimaryColumn({ name: 'userId', nullable: false, type: 'uuid', unique: true })
  userId: string;

  public constructor(init?: Partial<BalanceDb>) {
    Object.assign(this, init);
  }
}
