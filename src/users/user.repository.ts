import { Injectable } from "@nestjs/common";
import { createCardDTO } from "src/customers/CustomerDTO/card-customer.dto";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { hashingProtocol } from "src/auth/hash/hashing.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class userRepository{

    constructor(
        private readonly prismaService: PrismaService,
        private readonly Hashing: hashingProtocol

    ){}
    async createUser(createUserDTO: CreateUserDto){
        const passwordHash = await this.Hashing.hash(createUserDTO.password)

        return await this.prismaService.prisma.user.create({data:{
            name: createUserDTO.name,
            email:createUserDTO.email,
            password: passwordHash
        }
        })

    }

    async userByEmail(email:string){
        return await this.prismaService.prisma.user.findUnique({where:{email:email}})

    }

    async updateUser(userUpdate: UpdateUserDto){
        const newPassword = await this.Hashing.hash(userUpdate.newPassword)
        return await this.prismaService.prisma.user.update({where:{email: userUpdate.email}, data:{password:newPassword}})
    }

}