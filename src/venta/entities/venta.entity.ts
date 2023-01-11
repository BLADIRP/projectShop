import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operacion } from '../../operacion/entities/operacion.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('date', { default: null })
  Time: Date;
  @Column('float', {
    default: 0,
  })
  TotalOperacion: number;
  @Column('int', {
    default: 0,
  })
  TotalProductos: number;
  @OneToMany(() => Product, (product) => product.venta, {
    cascade: true,
    eager: true,
  })
  product: Product;
  @OneToOne(() => Operacion, (operacion) => operacion.venta, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  operacion: Operacion;
  //FK id producto
  //FK id usuario
  //FK id operacion
}
