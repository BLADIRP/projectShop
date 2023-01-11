import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Carrito } from './carrito.entity';

@Entity()
export class Car_Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Product, (product) => product.car_product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;
  @ManyToOne(() => Carrito, (carrito) => carrito.car_product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  carrito: Carrito;
}
