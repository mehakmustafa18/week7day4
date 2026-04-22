import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

const expressApp = express();
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return expressApp;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  await app.init();
  isInitialized = true;
  return expressApp;
}

// Local dev
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    const port = process.env.PORT ?? 4000;
    app.listen(port, () => {
      console.log(`🚀 Backend running on http://localhost:${port}`);
    });
  });
}

// Vercel serverless export
export default async (req: express.Request, res: express.Response) => {
  const app = await bootstrap();
  app(req, res);
};
