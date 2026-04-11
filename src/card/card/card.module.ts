import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { cardRepository } from './card.repository';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { filterException } from 'src/common/filters/exception-filter';

@Module({
  controllers: [CardController],
  providers: [CardService,cardRepository],
  imports: [PrismaModule]
})
export class CardModule {}
