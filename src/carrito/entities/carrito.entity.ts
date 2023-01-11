import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operacion } from '../../operacion/entities/operacion.entity';
import { Car_Product } from './car_product';

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { unique: true })
  nombre: string;
  @Column('bool', { default: false })
  estado: boolean;
  @Column('date', { default: null })
  TimeCreacion: Date;
  @Column('date', { default: null })
  TimeCompra: Date;

  @OneToOne(() => Operacion, (operacion) => operacion.carrito, {
    onDelete: 'CASCADE',
  })
  operacion: Operacion;
  @OneToMany(() => Car_Product, (car_product) => car_product.carrito, {
    cascade: true,
    eager: true,
  })
  car_product: Car_Product;
}
