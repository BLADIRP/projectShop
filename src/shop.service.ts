import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './products/product.repository';
import { CreateProductDto } from './products/dto/create-product.dto';
import { Respuesta } from './common/respuesta';
import { UpdateProductDto } from './products/dto/update-product.dto';
import { PaginationDTO } from './common/pagination.DTO';
import { RangoDTO } from './common/rango.DTO';
import { CarritoRepository } from './carrito/carrito.repository';
import { CreateCarritoDto } from './carrito/dto/create-carrito.dto';
import { CarProductRepository } from './carrito/carrito_product.repository';
import { AddProductDto } from './carrito/dto/create-car_product.dto';

@Injectable()
export class ShopService {
  private readonly logger = new Logger('ShopService');
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private carritoRepository: CarritoRepository,
    private carProductRepository: CarProductRepository,
    private respuesta: Respuesta,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.createProduct(
      createProductDto,
    );
    return this.respuesta.ok(product);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.updateProduct(
      id,
      updateProductDto,
    );
    return this.respuesta.ok(product);
  }

  async removeProduct(id: string) {
    const product = this.productRepository.removeProduct(id);
    return this.respuesta.ok(product);
  }
  /** Esta funcion obtiene maximo 50 productos y puede usar la paginacion*/
  async findProducts(paginationDTO: PaginationDTO) {
    const products = await this.productRepository.findAllProducts(
      paginationDTO,
    );
    return this.respuesta.ok(products);
  }

  async findNamePrecioAscDec(paginationDTO: PaginationDTO) {
    const products = await this.productRepository.findProductNamePrecioAscDec(
      paginationDTO,
    );
    return this.respuesta.ok(products);
  }

  async findIdNombre(term: string) {
    const product = await this.productRepository.findProduct(term);
    return this.respuesta.ok(product);
  }

  async findRangPrecio(rangoDTO: RangoDTO, paginationDTO: PaginationDTO) {
    const productosRango = await this.productRepository.findRang(
      rangoDTO,
      paginationDTO,
    );
    return this.respuesta.ok(productosRango);
  }

  async createCarrito(createCarritoDto: CreateCarritoDto) {
    createCarritoDto.TimeCreacion = new Date();
    const carrito = await this.carritoRepository.createCarrito(
      createCarritoDto,
    );
    return this.respuesta.ok(carrito);
  }

  async addProduct(addProductDto: AddProductDto) {
    const addProduct = addProductDto;
    const carrito = this.carritoRepository.findCarrito(addProduct.fkCar);
    if ((await carrito).estado == false) {
      console.log(addProduct);
      const product = await this.carProductRepository.addProduct(addProduct);
      return this.respuesta.ok(product);
    } else return this.respuesta.noOk();
  }
}
