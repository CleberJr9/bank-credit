import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsCpf } from "./iscpf";


export class CreateCustomerDTO {
    @IsString({message:"o campo precisa ser um texto"})
    @IsNotEmpty({message:"O campo name precisa ser preenchido"})
    readonly name: string;
    @IsEmail({},{message:"Email inválido"})
    @IsNotEmpty({message:"O email precisa ser preenchido"})
    readonly email: string; 
    @IsNotEmpty({message:"O cpf precisa ser preenchido"})
    @IsCpf()
    readonly cpf: string

    
}