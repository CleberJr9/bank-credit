import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";


export class createCardDTO {
    @IsNumber({},{message:"O valor precisa ser um número"})
    @IsPositive({message:"O número precisa ser positivo"})
    @IsNotEmpty({message:"O valor do limite do cartão não pode ser vazio"})
    readonly limitCents : number;

}