import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(process.env.SERVER_PORT) 
  
  app.enableCors( {
    origin: ['http://localhost:4200', 'http://192.168.33.10:4200'],   // Adjust according to your front-end URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.use(cookieParser());
  
}


bootstrap();
