import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // validador | pipe === cano | encaixado na encanação por onde meus dados passam 
      whitelist: true, // remove chaves que nao estão no DTO
      forbidNonWhitelisted: true, // exibe erro quando a propriedade não existir
      transform:false, // tenta transformar os tipos de dados de parametros e dtos 
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
