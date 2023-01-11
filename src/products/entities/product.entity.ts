// Esta parte crea la tabla en la base de datos
import { Venta } from 'src/venta/entities/venta.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Car_Product } from 'src/carrito/entities/car_product';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { unique: true })
  nombre: string;
  @Column('float', {
    default: 0,
  })
  PrecioVenta: number;

  @Column('float', {
    default: 0,
  })
  PrecioCompra: number;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @ManyToOne(() => Venta, (venta) => venta.product, {
    onDelete: 'CASCADE',
  })
  venta: Venta;
  @OneToMany(() => Car_Product, (car_product) => car_product.product, {
    cascade: true,
    eager: true,
  })
  car_product: Car_Product;
}
