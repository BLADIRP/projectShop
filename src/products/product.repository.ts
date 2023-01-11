import { Between, EntityRepository, Repository, getRepository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDTO } from 'src/common/pagination.DTO';
import { isUUID } from 'class-validator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ReturnDTO } from '../common/return.DTO';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProducRepository');

  //Funcion para el repositorio
  getProductRepository() {
    return getRepository(Product);
  }

  //crea el producto
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const productDetails = createProductDto;
      const product = this.getProductRepository().create(productDetails);
      await this.getProductRepository().save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  //realiza la busqueda de todo los productos
  async findAllProducts(): Promise<Array<Product>> {
    const products = this.getProductRepository().find();
    return products;
  }
  //realiza una busqueda de un rango de precios
  async findRang(paginationDTO: PaginationDTO): Promise<Array<Product>> {
    const { limit = 5, offset = 0 } = paginationDTO;
    return await this.getProductRepository().find({
      where: {
        PrecioCompra: Between(700, 720),
      },
      take: limit,
      skip: offset,
    });
  }
  //busca un producto con el id y con el nombre
  async findProduct(term: string): Promise<Product> {
    let product: Product;
    if (isUUID(term)) {
      product = await this.getProductRepository().findOne({ id: term });
    } else {
      product = await this.getProductRepository().findOne({ nombre: term });
    }
    if (!product) throw new NotFoundException(`id : ${term} not found`);
    return product;
  }

  //Busca un producto por el nombre y precio asc/dec
  async findProductNamePrecioAscDec(paginationDTO: PaginationDTO) {
    let products;
    if (paginationDTO.term == 'nombre') {
      products = await this.ordenNombre(paginationDTO);
      return this.ok(products);
    }
    if (paginationDTO.term == 'precio') {
      products = await this.ordenPrecio(paginationDTO);
      return this.ok(products);
    } else {
      return this.noOk();
    }
  }
  // realiza la actualizacion del product
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updateProduct = await this.getProductRepository().preload({
      id: id,
      ...updateProductDto,
    });
    if (!updateProduct)
      throw new NotFoundException(`Product when id: ${id} not found `);
    await this.getProductRepository().save(updateProduct);
    try {
      return updateProduct;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  //Realiza la eliminacion de un producto
  async removeProduct(id: string): Promise<Product> {
    const product = await this.findProduct(id);
    this.getProductRepository().remove(product);
    return product;
  }
  //funcion para manejar el error
  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async ordenNombre(paginationDTO: PaginationDTO): Promise<Array<Product>> {
    const { limit = 100, offset = 0, ordena, term } = paginationDTO;
    let products;
    if (term == 'nombre') {
      products = await this.getProductRepository().find({
        order: {
          nombre: ordena,
        },
        take: limit,
        skip: offset,
      });
    }

    return products;
  }

  async ordenPrecio(paginationDTO: PaginationDTO): Promise<Array<Product>> {
    const { limit = 100, offset = 0, term, ordena } = paginationDTO;
    let products;
    if (term == 'precio') {
      products = await this.getProductRepository().find({
        order: {
          PrecioCompra: ordena,
        },
        take: limit,
        skip: offset,
      });
    }
    return products;
  }

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