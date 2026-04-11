import { ConflictException,NotFoundException, Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDTO } from './CustomerDTO/create-customer.dto';
import { createCardDTO } from './CustomerDTO/card-customer.dto';

@Injectable()
export class CustomersService {
    constructor(private readonly customerRepository: CustomersRepository){}


   async createCustomer(CreateCustomerDTO:CreateCustomerDTO){
        const existCpf = await this.customerRepository.findCustomerCpf(CreateCustomerDTO.cpf);
        if(existCpf?.cpf === CreateCustomerDTO.cpf){
            throw new ConflictException("CPF já cadastrado"
            )
        }
        const existEmail = await this.customerRepository.findEmailCustomer(CreateCustomerDTO.email);
        if (existEmail?.email === CreateCustomerDTO.email){
            throw new ConflictException("Email já cadastrado")
        }
        const {id} = await this.customerRepository.createCustomer(CreateCustomerDTO)
     
        return {id}
    }

    async getCustomers (){
        const customers =  await this.customerRepository.getManyCustomer();
        return {customers}

    }
    async customerByCpf (cpf:string){
        const customer =await this.customerRepository.findCustomerCpf(cpf)
        if(!customer){
         throw new NotFoundException({message:"CPF não encontrado"})
        }
        return customer
    }

    async createCard (id: string, createCardDTO: createCardDTO){
        const customerExist = await this.customerRepository.getCustomerById(id)
        if (!customerExist){
            throw new NotFoundException("Cliente não encontrado")
        }
        const card = await this.customerRepository.createCard(id, createCardDTO.limitCents)
        
        return {card}
    }
}
