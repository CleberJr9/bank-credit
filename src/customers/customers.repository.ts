import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/infra/prisma/prisma.service";

@Injectable()
export class CustomersRepository{
    constructor(private readonly prismaService: PrismaService){}
    

    async createCustomer(data: Prisma.customerCreateInput){

        return await this.prismaService.prisma.customer.create({data})
    }
    async findCustomerCpf ( cpf: string){
        return await this.prismaService.prisma.customer.findUnique({where:{cpf}})
    }
    async findEmailCustomer (email: string){
        return await this.prismaService.prisma.customer.findUnique({where:{email}})
    }

    async getManyCustomer(){
        return await this.prismaService.prisma.customer.findMany({orderBy:{createAt: 'asc'}})
    }
    async getCustomerById (id:string){
        return await this.prismaService.prisma.customer.findUnique({where:{id}})
    }
    async createCard (id: string, cents:number){
        return await this.prismaService.prisma.card.create({data:{
            customerId: id,
            limitCents:cents,
            status:"BLOCKED",
            availableLimitCents:cents,
            usedCents: 0
        }

        });
    }
  
}