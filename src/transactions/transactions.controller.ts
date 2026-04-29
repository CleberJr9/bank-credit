import { Controller, Post, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':transactionId/reversal')
  create(@Param('transactionId') id: string) {
    return this.transactionsService.refundTransaction(id);
  }
}
