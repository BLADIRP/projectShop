// Esta parte crea la tabla en la base de datos
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart_Product } from 'src/carrito/entities/car_product';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  key: string;

  @Column('text', { unique: true })
  name: string;

  @Column('float', {
    default: 0,
  })
  purchasePrice: number;

  @Column('float', {
    default: 0,
  })
  salePrice: number;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('int', { array: true, default: '{0, 10, 20}' })
  discount: number[];

  @OneToMany(() => Cart_Product, (cart_product) => cart_product.product)
  cart_product: Cart_Product;
}
