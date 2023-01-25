import { TransactionsDTO } from 'src/common/Transactions.DTO';
import { TransactionsDetailsDTO } from 'src/common/transactions.details.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { OperacionRepository } from 'src/operacion/operacion.repository';
import { Injectable } from '@nestjs/common';
import { DiscountService } from '../../../../dist/discounts/interfaces/discount.service';
import { DiscontDTO } from 'dist/discounts/discount.dto';

@Injectable()
export class Percentage implements DiscountService {
  constructor(
    @InjectRepository(OperacionRepository)
    private operacionRepository: OperacionRepository,
  ) {}

  apply(discountValue: DiscontDTO): Promise<TransactionsDetailsDTO> {
    return this.detailsTransactions(discountValue);
  }

  async detailsTransactions(
    getTransactionsDTO: DiscontDTO,
  ): Promise<TransactionsDetailsDTO> {
    const { idSale, discount } = getTransactionsDTO;
    const transactionsArray = [];
    let subTotal = 0;
    const transactions = await this.operacionRepository.findOperacionBySaleId(
      idSale,
    );
    if (discount == 0 || discount == 10 || discount == 20) {
      for (let i = 0; i <= transactions.length - 1; i++) {
        const quantity = transactions[i].quantityProducts;
        const description = transactions[i].description;
        const salePrice = transactions[i].salePrice;
        const purchasePrice = transactions[i].purchasePrice;
        const profitPercentage = transactions[i].Utilidad / quantity;
        const total = transactions[i].total;
        subTotal += total;
        const transactionsAux: TransactionsDTO = {
          quantity,
          description,
          salePrice,
          purchasePrice,
          profitPercentage,
          total,
        };
        transactionsArray.push(transactionsAux);
      }

      const discountPercentage = discount / 100;
      const totalAmount = subTotal - subTotal * discountPercentage;

      const transactionsDetails: TransactionsDetailsDTO = {
        transactions: transactionsArray,
        subTotal,
        discount,
        totalAmount,
      };
      return transactionsDetails;
    } else {
      const transactionsDetails: TransactionsDetailsDTO = {
        transactions: null,
        subTotal: null,
        discount: null,
        totalAmount: null,
      };
      return transactionsDetails;
    }
  }
}
