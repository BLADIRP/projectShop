import { Carrito } from 'src/carrito/entities/carrito.entity';
import { Venta } from '../../venta/entities/venta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Operacion {
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
  CantidadProducto: number;
  @Column('float', {
    default: 0,
  })
  PrecioVenta: number;
  @Column('float', {
    default: 0,
  })
  Descuento: number;
  @Column('float', {
    default: 0,
  })
  Total: number;
  @Column('float', {
    default: 0,
  })
  PrecioCompra: number;
  @Column('float', {
    default: 0,
  })
  Utilidad: number;
  //FK id carrito

  @OneToOne(() => Carrito, (carrito) => carrito.operacion, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  carrito: Carrito;

  @OneToOne(() => Venta, (venta) => venta.operacion, {
    onDelete: 'CASCADE',
  })
  venta: Venta;
}
