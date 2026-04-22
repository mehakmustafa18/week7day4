import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

const expressApp = express();
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return expressApp;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] });

  await app.init();
  isInitialized = true;
  return expressApp;
}

export default async (req: express.Request, res: express.Response) => {
  const app = await bootstrap();
  app(req, res);
};
