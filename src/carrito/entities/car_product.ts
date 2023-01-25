import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Cart } from './carrito.entity';
@Entity()
export class Cart_Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.cart_product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cart_product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  cart: Cart;

  @Column('int', {
    default: 1,
  })
  amount: number;
}
