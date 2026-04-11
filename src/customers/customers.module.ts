import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './customers.repository';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { InterceptorsConsumer } from '@nestjs/core/interceptors';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService,CustomersRepository,InterceptorsConsumer],
  imports: [PrismaModule]
})
export class CustomersModule {}
