import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"


export class UpdateUserDto {

    @IsEmail({},{message:"Email precisa ser válido"})
    @IsNotEmpty({message:"O valor email não pode estar vazio "})
    readonly email: string
    @IsNotEmpty({message:"O valor password não pode estar vazio "})
    readonly password: string
    @IsNotEmpty({message:"O valor password não pode estar vazio "})
    @IsStrongPassword({minLength:4,minNumbers:1,minUppercase:1},{message:"A senha precisa de 4 caracteres e 1 letra maúscula e 1 número."})
    readonly newPassword: string
        
}
