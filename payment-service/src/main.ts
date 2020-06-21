import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

async function bootstrap() {
  const logger = new Logger('PaymentService');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 1000,
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    },
  });
  await app
    .listenAsync()
    .then(() => logger.log(`Payment microservice is listening`));
}
bootstrap();
