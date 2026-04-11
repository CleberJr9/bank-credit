import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './CustomerDTO/create-customer.dto';
import { updateCustomer } from './CustomerDTO/update-customer.dto';
import { createCardDTO } from './CustomerDTO/card-customer.dto';
import { LoggerInterceptor } from 'src/common/interceptors/loggers.interceptor';
import { bodyCustomerInterceptor } from 'src/common/interceptors/body-customer.interceptor';
import { AddHeaderInterception } from 'src/common/interceptors/add-header.interceptor';
import { AuthTokenGuard } from 'src/common/guards/auth-token.guard';

@Controller('customers')
@UseGuards(AuthTokenGuard)
@UseInterceptors(LoggerInterceptor)
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  @UseInterceptors(bodyCustomerInterceptor)
  async createCustomer(@Body() CreateCustomerDTO: CreateCustomerDTO) {
    return await this.customerService.createCustomer(CreateCustomerDTO);
  }
  @Get()
  @UseInterceptors(AddHeaderInterception)
  async getcustomers(@Query() cpf: updateCustomer) {
    if (cpf.cpf) {
      return await this.customerService.customerByCpf(cpf.cpf);
    }
    return await this.customerService.getCustomers();
  }

  @Post(':id/card')
  async createCardCustomer(
    @Param('id') id: string,
    @Body() cardDTO: createCardDTO,
  ) {
    return await this.customerService.createCard(id, cardDTO);
  }
}
