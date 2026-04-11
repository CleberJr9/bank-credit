import { IsNotEmpty } from "class-validator"
import { IsCpf } from "./iscpf"

export class FindCpfDTO {

    @IsNotEmpty({message:"O cpf precisa ser preenchido"})
    @IsCpf()
    readonly cpf:string
}