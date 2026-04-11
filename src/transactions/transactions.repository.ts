import { PrismaService } from 'src/infra/prisma/prisma.service';
import { transactions } from 'prisma';

export class transactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async transactionsById(id: string) {
    return this.prismaService.prisma.transactions.findUnique({
      where: { id },
    });
  }

  async getTransactionReversal(originalTransactionId: string) {
    return this.prismaService.prisma.transactions.findFirst({
      where: {
        originalTransactionId,
        type: 'REVERSAL',
      },
    });
  }

  async refundTransaction(originalTransaction: transactions) {
    
    const existingRefund = await this.getTransactionReversal(
      originalTransaction.id,
    );

    if (existingRefund) {
      return existingRefund;
    }


    return this.prismaService.prisma.$transaction(async (tx) => {
      
      const refund = await tx.transactions.create({
        data: {
          cardId: originalTransaction.cardId,
          amountCents: originalTransaction.amountCents,
          merchant: originalTransaction.merchant,
          status: 'REFUNDED',
          refundDate: new Date(),
          type: 'REVERSAL',
          originalTransactionId: originalTransaction.id,
          idempotencyKey: `reversal-${originalTransaction.id}`,
        },
      });

      await tx.card.update({
        where: { id: originalTransaction.cardId },
        data: {
          availableLimitCents: {
            increment: originalTransaction.amountCents,
          },
          usedCents: {
            decrement: originalTransaction.amountCents,
          },
        },
      });

      return refund;
    });
  }
}
