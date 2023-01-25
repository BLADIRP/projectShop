import { TransactionsDetailsDTO } from 'src/common/transactions.details.DTO';
import { DiscontDTO } from 'src/discounts/discount.dto';
import { DiscountService } from '../discount.service';
import { DetailsByPercentage } from './details.transactions';

export abstract class AbtractDiscount
  extends DetailsByPercentage
  implements DiscountService
{
  veriFy(discountValue: DiscontDTO): Promise<TransactionsDetailsDTO> {
    const discont = discountValue.discount;
    const type = discountValue.tipoDiscont;
    if ((discont == 0 || discont == 10 || 20) && type == 'PERCENTAGE') {
      return this.detailsTransactions(discountValue);
    }

    if (discont >= 0 && type == 'AMOUNT') {
      const discontSale: DiscontDTO = {
        discount: 0,
        idSale: discountValue.idSale,
        tipoDiscont: discountValue.tipoDiscont,
      };
      return this.detailsTransactions(discontSale);
    } else {
      return null;
    }
  }

  detailsTransactions(discontDTO: DiscontDTO): Promise<TransactionsDetailsDTO> {
    return super.detailsTransactions(discontDTO);
  }
}
