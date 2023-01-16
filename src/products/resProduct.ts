import { Product } from 'src/products/entities/product.entity';
import { ReturnDTO } from '../common/return.DTO';

export class RespProduct {
  ok(products: Array<Product>): ReturnDTO<Array<Product>> {
    return new ReturnDTO(
      'Datos recuperados correctamente',
      'ok',
      products,
      new Date(),
    );
  }

  noOk(): ReturnDTO<any> {
    return new ReturnDTO(
      'Datos no recuperados',
      'bad request',
      null,
      new Date(),
    );
  }
}
