import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response,Request } from "express";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class filterException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response =ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const errorResponse = exception.getResponse()

        response.status(400).json(
            {
                // vai ser um filtro de  exception not found do servico do card
                message:errorResponse === ""? errorResponse: "Não encontrado",
                statusCode: status,
                timestamp: new Date()
            }
        )
        
    }
    
}