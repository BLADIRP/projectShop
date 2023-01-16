import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from 'src/common/pagination.DTO';
import { RangoDTO } from '../common/rango.DTO';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.createProduct(createProductDto);
    return product;
  }

  async findAll(paginationDTO: PaginationDTO) {
    const products = this.productRepository.findAllProducts(paginationDTO);
    return products;
  }

  async rango(rangoDTO: RangoDTO, paginationDTO: PaginationDTO) {
    const productosRango = this.productRepository.findRang(
      rangoDTO,
      paginationDTO,
    );
    return productosRango;
  }

  async findOne(term: string) {
    const product = this.productRepository.findProduct(term);
    return product;
  }

  async findNamePrecioAscDec(paginationDTO: PaginationDTO) {
    const products =
      this.productRepository.findProductNamePrecioAscDec(paginationDTO);
    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.productRepository.updateProduct(id, updateProductDto);
    return `Product: ${product} fue removido`;
  }

  async remove(id: string) {
    const product = this.productRepository.removeProduct(id);
    return `Product: ${(await product).id} fue removido`;
  }
}
