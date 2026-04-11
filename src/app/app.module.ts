import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { CustomersModule } from '../customers/customers.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CardModule } from 'src/card/card/card.module';
import { UsersModule } from 'src/users/users.module';
import { loggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // adicionando configure module com ele posso acessar valores de variaveis de ambiente.  example: atraves do process.env  
  imports: [CustomersModule, ConfigModule.forRoot(), PrismaModule,CardModule,UsersModule,AuthModule],
  controllers: [AppController],
  providers: [AppService , AppRepository],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware)
    .forRoutes(
      {path: "*",
      method: RequestMethod.ALL}
    )
  }
}
 