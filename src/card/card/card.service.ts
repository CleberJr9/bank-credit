import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { cardRepository } from './card.repository';
import { buyCardDto } from './dto/buy-card.dto';
import { isArrayBufferView } from 'node:util/types';
import { filterException } from 'src/common/filters/exception-filter';

@Injectable()
@UseFilters(filterException)
export class CardService {
  constructor(private readonly cardRepository: cardRepository) {}

  async unblockCard(cardId: string) {
    const card = await this.cardRepository.getCardById(cardId);
    if (!card) {
      throw new NotFoundException('cartão não encontrado');
    }
    if (card.status === 'ACTIVE') {
      return {
        sucess: true,
        message: ' cartão desbloqueado',
        data: card,
      };
    }
    const cardUpdate = await this.cardRepository.updateUnblock(cardId);
    return {
      sucess: true,
      message: ' cartão desbloqueado',
      data: cardUpdate,
    };
  }

  async blockCard(cardId: string) {
    const card = await this.cardRepository.getCardById(cardId);
    if (!card) {
      throw new NotFoundException('Cartão não encontrado');
    }
    if (card.status === 'BLOCKED')
      return {
        sucess: true,
        message: 'cartão bloqueado',
        data: card,
      };
    const cardStatusBlock = await this.cardRepository.blockCard(cardId);

    return {
      sucess: true,
      message: 'Cartão bloqueado',
      data: cardStatusBlock,
    };
  }

  async buyCard(
    idempotency_key: string,
    cardId: string,
    buycardDTO: buyCardDto,
  ) {
    //card e idempotencykey obrigatorios
    if (!idempotency_key || !cardId) {
      throw new BadRequestException(
        'idempotency_key e cardId são obrigatórios',
      );
    }
    const card = await this.cardRepository.getCardById(cardId);
    if (!card) {
      throw new NotFoundException('Cartão não encontrado');
    }
    if (card.status === 'BLOCKED') {
      throw new ConflictException('Compra não autorizada cartão bloqueado');
    }
    const transaction = await this.cardRepository.getTransactionByKey(
      idempotency_key,
      cardId,
    );
    // idempotencia tratada aqui
    if (transaction) {
      return {
        sucess: true,
        message: 'Transação concluida com sucesso',
        data: transaction,
      };
    }

    if (buycardDTO.amountCents > card.availableLimitCents) {
      const transactionDeclined =
        await this.cardRepository.transactionDeclinedCard(
          cardId,
          buycardDTO,
          idempotency_key,
        );
      throw new ConflictException({
        message: 'Limite insuficiente para realizar a compra',
        data: transactionDeclined,
      });
    }
    if (buycardDTO.amountCents <= card.availableLimitCents) {
      await this.cardRepository.updateCardAvaliableLimit(cardId, buycardDTO);

      const transactionApprovedCard =
        await this.cardRepository.transactionApprovedCard(
          cardId,
          buycardDTO,
          idempotency_key,
        );

      return {
        sucess: true,
        message: 'Transação concluida com sucesso',
        data: transactionApprovedCard,
      };
    }
  }
  async extractTransactions(cardId: string) {
    const card = await this.cardRepository.getCardById(cardId);
    if (!card) {
      throw new NotFoundException('Cartão não encontrado');
    }
    const transactions = await this.cardRepository.extractTransactions(cardId);
    return {
      sucess: true,
      message: 'Busca no extrato concluída com sucesso',
      data: transactions,
    };
  }
  async limitCard(cardID) {
    const card = await this.cardRepository.getCardById(cardID);
    if (!card) {
      throw new NotFoundException('Cartão não encontrado');
    }
    return {
      limitCents: card.limitCents,
      usedCents: card.usedCents,
      availableCents: card.availableLimitCents,
    };
  }
}
