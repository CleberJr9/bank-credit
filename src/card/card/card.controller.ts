import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers } from '@nestjs/common';
import { CardService } from './card.service';
import { buyCardDto } from './dto/buy-card.dto';


@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Patch(":cardId/unblock")
  async unblockCard(@Param('cardId') cardId:string){
    return await this.cardService.unblockCard(cardId)
  }

  @Patch(":cardId/block")
  async blockCard(@Param("cardId") cardId:string){
    return await this.cardService.blockCard(cardId)
  }

  @Post(":cardId/authorizations")
async buyCard(
  @Param('cardId') cardId: string,
  @Body() buycardDTO: buyCardDto,
  @Headers("idempotency_key") idempotency_key: string
) {
  return await this.cardService.buyCard(
    idempotency_key,
    cardId,
    buycardDTO
  )
}


  @Get(":cardId/transactions")
  async transactions(@Param("cardId") cardId:string){
    return await this.cardService.extractTransactions(cardId)
  }

  @Get(":cardId/limit")
  async limitCard(@Param('cardId') cardId:string){
    return await this.cardService.limitCard(cardId)
  }

  


}
