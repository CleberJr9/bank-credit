import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { userRepository } from './user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService,userRepository],
  imports:[PrismaModule]
})
export class UsersModule {}
