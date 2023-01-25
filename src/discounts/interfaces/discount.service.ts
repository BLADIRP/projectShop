import { DiscontDTO } from '../discount.dto';
import { TransactionsDetailsDTO } from 'src/common/transactions.details.DTO';

export interface DiscountService {
  veriFy(discountValue: DiscontDTO): Promise<TransactionsDetailsDTO>;
}
