import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { transactionRepository } from './transactions.repository';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService,transactionRepository],
  imports:[PrismaModule]
})
export class TransactionsModule {}
