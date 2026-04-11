import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {


    @IsString({message:"O valor name precisa ser um texto"})
    @IsNotEmpty({message:"O valor name não pode estar vazio "})
    readonly name: string
    @IsEmail({},{message:"Email precisa ser válido"})
    @IsNotEmpty({message:"O valor email não pode estar vazio "})
    readonly email: string
    @IsNotEmpty({message:"O valor password não pode estar vazio "})
    @IsStrongPassword({minLength:4,minNumbers:1,minUppercase:1},{message:"A senha precisa de 4 caracteres e 1 letra maúscula e 1 número."})
    readonly password: string
    

}
