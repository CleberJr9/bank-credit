import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class buyCardDto {


    @IsPositive({message:"O número precisa ser positivo"})
    @IsNumber({},{message:"O valor precisa ser um número"})
    @IsNotEmpty({message: "O valor não pode estar vazio"})
    readonly amountCents: number;

    @IsNotEmpty({message: "O valor não pode estar vazio"})
    @IsString({message: "O valor precisa ser um texto"})
    readonly merchant: string


    
}
