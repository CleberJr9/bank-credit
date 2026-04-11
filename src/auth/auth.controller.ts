import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  signInDTO } from './DTO/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
@Post()
async sign(@Body() signIn: signInDTO){
  return await this.authService.signIn(signIn)
}


}
