import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { bcryptService } from './hash/bcrypt.service';
import { hashingProtocol } from './hash/hashing.service';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { authRepository } from './auth.repository';
import { userRepository } from 'src/users/user.repository';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

//modulo global pode ser usado na aplicação inteira.

@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: hashingProtocol,
      useClass: bcryptService,
    },
    authRepository,
    userRepository,
  ],
  exports: [hashingProtocol, JwtModule, ConfigModule],
})
export class AuthModule {}
