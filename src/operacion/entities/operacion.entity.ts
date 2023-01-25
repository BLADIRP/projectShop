import { Cart } from 'src/carrito/entities/carrito.entity';
import { Sale } from '../../venta/entities/venta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('int', {
    default: 0,
  })
  quantityProducts: number;

  @Column('float', {
    default: 0,
  })
  salePrice: number;

  @Column('float', {
    default: 0,
  })
  discount: number;

  @Column('float', {
    default: 0,
  })
  total: number;

  @Column('float', {
    default: 0,
  })
  purchasePrice: number;

  @Column('float', {
    default: 0,
  })
  Utilidad: number;
  //FK id carrito

  @ManyToOne(() => Cart, (cart) => cart.transaction)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Sale, (sale) => sale.transaction, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  sale: Sale;
}
