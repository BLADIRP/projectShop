import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../../operacion/entities/operacion.entity';
import { Cart_Product } from './car_product';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('bool', { default: false })
  state: boolean;

  @Column('date', { default: null })
  creationTime: Date;

  @Column('date', { default: null })
  purchaseTime: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.cart, {
    onDelete: 'CASCADE',
  })
  transaction: Transaction;

  @OneToMany(() => Cart_Product, (cart_product) => cart_product.cart)
  cart_product: Cart_Product;
}
