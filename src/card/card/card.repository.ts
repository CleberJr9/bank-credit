import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { buyCardDto } from "./dto/buy-card.dto";


@Injectable()
export class cardRepository {
    constructor (private readonly prismaService: PrismaService){}



    async getCardById(cardId: string){
        return this.prismaService.prisma.card.findUnique({where:{
            id: cardId
        }})
    }
    async updateUnblock(cardId: string){
        return await this.prismaService.prisma.card.update({where: {id: cardId}, data:{
            status: "ACTIVE"
        }})
    }

    async blockCard(cardId:string){
        return await this.prismaService.prisma.card.update({where:{id:cardId},data:{
            status: "BLOCKED"
        }})

    
    }
    async getTransactionByKey(idempotency_key:string, cardId: string){
        return await this.prismaService.prisma.transactions.findUnique({where:{
            idempotencyKey:idempotency_key,
            cardId: cardId
        }})
    }

    async updateCardAvaliableLimit(cardId:string, buycardDTO: buyCardDto){
        return await this.prismaService.prisma.card.update(
            {where:{id:cardId},
            data:{availableLimitCents:{decrement:buycardDTO.amountCents}, usedCents:{increment:buycardDTO.amountCents}}
        })
    }
    async  transactionApprovedCard (cardId: string, buyCardDto: buyCardDto, idempotency_key: string){
        
        return await this.prismaService.prisma.transactions.create({data:{
            cardId: cardId,
            merchant: buyCardDto.merchant,
            amountCents: buyCardDto.amountCents,
            idempotencyKey: idempotency_key,
            status: "APPROVED"
            
        }}) 

    }
    async  transactionDeclinedCard (cardId: string, buyCardDto: buyCardDto, idempotency_key: string){
        
        return await this.prismaService.prisma.transactions.create({data:{
            cardId: cardId,
            merchant: buyCardDto.merchant,
            amountCents: buyCardDto.amountCents,
            idempotencyKey: idempotency_key,
            status: "DECLINED",
            declineReason: "O cartão não possui limite disponível"
            
        }})
    }

    async extractTransactions ( cardId:string){
        return await  this.prismaService.prisma.transactions.findMany({where:{cardId: cardId}, orderBy:{createdAt:"desc"}})
    }

    async transactionById (transactionId: string){
        return await this.prismaService.prisma.transactions.findUnique({where:{id:transactionId}})
    }


}


