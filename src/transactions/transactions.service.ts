import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { transactionRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: transactionRepository) {}

  async refundTransaction(id: string) {
    const transaction = await this.transactionRepository.transactionsById(id);

    // 404
    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    if (transaction.status !== 'APPROVED') {
      throw new ConflictException('NOT_REVERSIBLE');
    }

    // Idempotência  estorno
    const refund =
      await this.transactionRepository.refundTransaction(transaction);

    return {
      success: true,
      message: 'Estorno realizado com sucesso',
      data: refund,
    };
  }
}
