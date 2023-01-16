import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => Operacion, (operacion) => operacion.venta, {
    onDelete: 'CASCADE',
  })
  operacion: Operacion;
}
