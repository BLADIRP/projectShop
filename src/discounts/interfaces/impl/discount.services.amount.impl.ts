import { TransactionsDetailsDTO } from 'src/common/transactions.details.DTO';
import { DiscontDTO } from 'src/discounts/discount.dto';
import { AbtractDiscount } from './abstract.discounts.services';

export class Currency extends AbtractDiscount {
  detailsTransactions(discontDTO: DiscontDTO): Promise<TransactionsDetailsDTO> {
    return this.detailsTransactions(discontDTO);
  }
}
