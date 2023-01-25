import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './products/product.repository';
import { CreateProductDto } from './products/dto/create-product.dto';
import { Response } from './common/respuesta';
import { UpdateProductDto } from './products/dto/update-product.dto';
import { PaginationDTO } from './common/pagination.DTO';
import { CarritoRepository } from './carrito/carrito.repository';
import { CreateCartDto } from './carrito/dto/create-carrito.dto';
import { CarProductRepository } from './carrito/carrito_product.repository';
import { AddProductDto } from './carrito/dto/create-car_product.dto';
import { OperacionRepository } from './operacion/operacion.repository';
import { CreateSaleDto } from './venta/dto/create-venta.dto';
import { VentaRepository } from './venta/venta.repository';
import { Product } from './products/entities/product.entity';
import { UpdateAddProductDto } from './carrito/dto/update-car_product.dto';
import { Cart_Product } from './carrito/entities/car_product';
import { isUUID } from 'class-validator';
import { CreateTransactionDTO } from './operacion/dto/create-operacion.dto';
import { Sale } from './venta/entities/venta.entity';
import { DiscountService } from './discounts/interfaces/discount.service';
import { Percentage } from './discounts/interfaces/impl/discount.services.perecentage.impl';
import { DiscontDTO } from './discounts/discount.dto';
import { Currency } from './discounts/interfaces/impl/discount.services.amount.impl';
@Injectable()
export class ShopService {
  private readonly logger = new Logger('ShopService');
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private carritoRepository: CarritoRepository,
    private carProductRepository: CarProductRepository,
    private operacionRepository: OperacionRepository,
    private ventaRepository: VentaRepository,
    @Inject(Percentage)
    private discountPercentageServiceImpl: DiscountService,

    @Inject(Currency)
    private discountCurrencyServiceImpl: DiscountService,
  ) {}

  async detailsTransactions(discontDTO: DiscontDTO) {
    const percentage =
      discontDTO.tipoDiscont == 'PERCENTAGE'
        ? this.discountPercentageServiceImpl.veriFy(discontDTO)
        : this.discountCurrencyServiceImpl.veriFy(discontDTO);
    console.log(percentage);
  }
  //1
  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.createProduct(
      createProductDto,
    );
    return Response.ok(product);
  }
  //2
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.updateProduct(
      id,
      updateProductDto,
    );
    return Response.ok(product);
  }
  //3
  /*//////////////////////////////////////////////////////////// */
  /** Esta funcion obtiene maximo 50 productos y puede usar la paginacion*/
  async findProducts(paginationDTO: PaginationDTO) {
    const products = await this.productRepository.findAllProducts(
      paginationDTO,
    );
    const productInStock = await this.inStock(products);
    if (productInStock == 'noStock') {
      return Response.isError('This product is not available');
    }
    return Response.ok(productInStock);
  }
  async removeProduct(id: string) {
    const product = this.productRepository.removeProduct(id);
    return Response.ok(product);
  }
  //4
  //bloque uno
  async createCart(createCartDto: CreateCartDto) {
    createCartDto.creationTime = new Date();
    const cart = await this.carritoRepository.createCart(createCartDto);
    return Response.ok(cart);
  }
  //5
  async addProduct(addProduct: AddProductDto) {
    const { cartId, productId } = addProduct;
    const cart = await this.statusCart(cartId);
    const product = await this.productRepository.findById(productId);
    const productInStock = await this.inStock(product);
    if (productInStock == 'noStock') {
      return Response.isError(
        'This product does not exist in the inventory, you can add another product or make the sale',
      ); // bloque 4.1, 4.1, 4.2
    } else {
      if (cart == false) {
        const cartContent = await this.cartProductCheck(addProduct);
        if (cartContent[0] == 'notCart' || cartContent[1] == 'notProduct') {
          const product = await this.carProductRepository.addProduct(
            addProduct,
          ); // bloque 8
          return Response.ok(product);
        }
        if (cartContent[0] == 'bothExist') {
          const amount = +cartContent[1] + addProduct.amount;
          const id = cartContent[2];
          const carproduct = await this.carProductRepository.updateProduct(id, {
            amount,
          });
          return Response.ok(carproduct, 'the product was added successfully');
        }
      } else
        return Response.isError(
          `You cannot add this product to this cart because the cart has already been sold.`,
        );
    }
  }
  //6
  //blaque 5
  async removeCart(id: string) {
    const message = 'the sale of the car is canceled';
    if (isUUID(id)) {
      const car = await this.carritoRepository.removeCarrito(id);
      return Response.ok(car, message);
    }
    return Response.isError(
      `The sale was not canceled because the cart id is incorrect`,
    );
  }

  //7
  async createSale(idCart: string) {
    const stateCart = await this.statusCart(idCart);
    if (stateCart == true) {
      return Response.isError(
        'the sale could not be processed because this cart has already been sold',
      );
    }
    const openSale: CreateSaleDto = {
      time: new Date(),
      totalTransaction: 0,
      totalProducts: 0,
    };

    const cart: CreateCartDto = {
      state: true,
      purchaseTime: new Date(),
      name: undefined,
      creationTime: undefined,
    };

    const cartSold = await this.carProductRepository.findCart(idCart);
    const message = await this.productsInStock(cartSold); //10 y 11
    if (cartSold.length != 0) {
      if (message == 'newCar') {
        const newCar = await this.carProductRepository.findCart(idCart);
        return Response.ok(
          newCar,
          'There are not enough items in inventory, these are the items in your cart that are in inventory. Do you want to finish the like or delete the cart?',
        );
      }

      for (let i = 0; i <= cartSold.length - 1; i++) {
        openSale.totalTransaction =
          cartSold[i].amount * cartSold[i].product.salePrice;
        openSale.totalProducts += cartSold[i].amount;
      }
      const sale = await this.ventaRepository.createSale(openSale);
      await this.carritoRepository.updateCart(idCart, cart);
      this.createTransaction(idCart, sale);
      return Response.ok(sale, 'the sale was made');
    } else
      return Response.isError(
        'the sale cannot be processed because the cart is empty',
      );
  }
  //8
  async createTransaction(idCart: string, sale: Sale) {
    const cart = await this.carProductRepository.findCart(idCart);
    const transactions = [];

    for (let i = 0; i <= cart.length - 1; i++) {
      const transaction: CreateTransactionDTO = {
        description: cart[i].product.description,
        quantityProducts: cart[i].amount,
        salePrice: cart[i].product.salePrice,
        purchasePrice: cart[i].product.purchasePrice,
        discount: 0,
        total: cart[i].product.salePrice * cart[i].amount,
        utility:
          ((cart[i].product.salePrice * cart[i].amount -
            cart[i].product.purchasePrice * cart[i].amount) /
            cart[i].product.salePrice) *
          100,
        cartId: cart[i].cart.id,
        saleId: sale.id,
      };
      const newStock = cart[i].product.stock - cart[i].amount;
      const idProduct = cart[i].product.id;
      const newProduct: UpdateProductDto = {
        key: undefined,
        name: undefined,
        salePrice: undefined,
        purchasePrice: undefined,
        stock: newStock,
        description: undefined,
      };
      await this.productRepository.updateProduct(idProduct, newProduct);
      await this.operacionRepository.createOperacion(transaction);
      transactions.push(transaction);
    }
    return Response.ok(
      transactions,
      'the cart operations obtained successfully',
    );
  }

  // Funciones necesarias
  async inStock(products: Product[]): Promise<string | Array<Product>> {
    let productInStock: Product[];
    if (products.length > 1) {
      productInStock = products.filter((products) => products.stock != 0);
      return productInStock;
    } else {
      productInStock = products.filter((products) => products.stock != 0);
      if (productInStock.length >= 1) {
        return productInStock;
      } else return 'noStock';
    }
  }

  async productsInStock(cartSale: Cart_Product[]): Promise<string> {
    let newPrduct: UpdateAddProductDto;
    for (let i = 0; i <= cartSale.length - 1; i++) {
      const idCarProduct = cartSale[i].id;
      const amount = cartSale[i].amount;
      const stock = cartSale[i].product.stock;
      const resAmount = stock - amount;
      if (stock == 0) {
        this.carProductRepository.removeProduct(idCarProduct);
        return 'newCar';
      }
      if (resAmount < 0) {
        newPrduct = {
          amount: amount - Math.abs(resAmount),
          cartId: undefined,
          productId: undefined,
        };
        await this.carProductRepository.updateProduct(idCarProduct, newPrduct);
        return 'newCar';
      } else return 'process sale';
    }
  }

  async updateStock(idProduct: string, amount: number, stock: number) {
    const updateProduct: UpdateProductDto = {
      key: undefined,
      name: undefined,
      salePrice: undefined,
      purchasePrice: undefined,
      description: undefined,
      stock: stock - amount,
    };
    await this.productRepository.updateProduct(idProduct, updateProduct);
  }

  async statusCart(idCart: string) {
    const stCart = await this.carritoRepository.findCart(idCart);
    if (stCart.state == true) {
      return true;
    } else return false;
  }

  async cartProductCheck(addProductDto: AddProductDto): Promise<Array<string>> {
    const { cartId, productId } = addProductDto;
    const carts = await this.carProductRepository.findCart(cartId);
    if (carts.length >= 1) {
      const product = carts.filter((cart) => cart.product.id == productId);
      if (product.length >= 1) {
        const amount = product[0].amount;
        const id = product[0].id;
        return [`bothExist`, `${amount}`, `${id}`];
      } else return [`cartExists`, `notProduct`];
    }
    return [`notCart`, `notProduct`];
  }
}
