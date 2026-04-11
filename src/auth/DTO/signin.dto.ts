import { IsEmail, IsNotEmpty } from 'class-validator';

export class signInDTO {
  @IsEmail({}, { message: 'O campo email precisa ser válido' })
  readonly email: string;
  @IsNotEmpty({ message: 'O campo password não pode estar vazio' })
  readonly password: string;
}
