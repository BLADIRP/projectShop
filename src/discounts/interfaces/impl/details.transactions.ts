import { InjectRepository } from '@nestjs/typeorm';
import { OperacionRepository } from 'src/operacion/operacion.repository';
import { TransactionsDetailsDTO } from 'src/common/transactions.details.DTO';
import { DiscontDTO } from 'src/discounts/discount.dto';
import { TransactionsDTO } from 'src/common/Transactions.DTO';

export class DetailsByPercentage {
  constructor(
    @InjectRepository(OperacionRepository)
    private operacionRepository: OperacionRepository,
  ) {}

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
