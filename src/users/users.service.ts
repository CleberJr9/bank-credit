import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userRepository } from './user.repository';
import { hashingProtocol } from 'src/auth/hash/hashing.service';
import { compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userrespository: userRepository,
    private readonly hashingService: hashingProtocol
  ){}

  async create(createUserDto: CreateUserDto) {
    const emailExist = await this.userrespository.userByEmail(createUserDto.email)
    if (emailExist){
      throw new ConflictException("Email já cadastrado")
    }
    const user = await this.userrespository.createUser(createUserDto)
    

    if(!user){
      throw new InternalServerErrorException("Erro inesperado")
    }
    return {
      sucess:true,
      message:"Usuário cadastrado com sucesso",
      data:{
        email: user.email
      }
    }
  }
  async updateUserPassword (updateUserDto:UpdateUserDto){
    const user = await this.userrespository.userByEmail(updateUserDto.email)
    if (!user){
      throw new NotFoundException("Usuário não encontrado!")
    }
    const isPasswordValid = await this.hashingService.compare(updateUserDto.password,user.password)

    if (!isPasswordValid){
      throw new BadRequestException("Senha Inválida!")
    }
    const passwordUpdate = await this.userrespository.updateUser(updateUserDto)

    return{
      sucess:true,
      message:"Senha alterada com sucesso!",
      data:{
        email: passwordUpdate.email
      }
    }

  }

  

}
