import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { signInDTO } from './DTO/signin.dto';
import { hashingProtocol } from './hash/hashing.service';
import { userRepository } from 'src/users/user.repository';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashing: hashingProtocol,
    private readonly userRepository: userRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {
    console.log(jwtConfiguration);
  }

  async signIn(signInDTO: signInDTO) {
    const user = await this.userRepository.userByEmail(signInDTO.email);

    if (!user) {
      throw new HttpException(
        'Senha ou email inválido',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordIsvalid = await this.hashing.compare(
      signInDTO.password,
      user.password,
    );

    if (!passwordIsvalid) {
      throw new HttpException(
        'Senha ou email inválido',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.jwtService.signAsync(
      { email: user.email },
      {
        secret: this.jwtConfiguration.secret!,
        expiresIn: '15m',
        audience: this.jwtConfiguration.audience!,
        issuer: this.jwtConfiguration.issuer!,
      },
    );

    return {
      token: token,
    };
  }
}
