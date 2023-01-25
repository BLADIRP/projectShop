import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../../operacion/entities/operacion.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date', { default: null })
  time: Date;

  @Column('int', {
    default: 0,
  })
  totalTransaction: number;

  @Column('int', {
    default: 0,
  })
  totalProducts: number;

  @OneToMany(() => Transaction, (transaction) => transaction.sale, {
    onDelete: 'CASCADE',
  })
  transaction: Transaction;
}
