import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('credit-bank')
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      transform: true
    }
  )
  )
  await app.listen(process.env.PORT ?? 2003);
}
bootstrap();
