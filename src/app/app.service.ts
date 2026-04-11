import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {

    getHello(){
        return "Hello"
    }
}
