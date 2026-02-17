import 'reflect-metadata';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDatabase } from './database';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

Error.stackTraceLimit = 50;
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION\n', err?.stack || err);
});
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION\n', (reason as Error)?.stack || reason);
});

dotenv.config();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
  'https://mgportfolioconnecticons.s3.us-east-1.amazonaws.com',
  'https://marlee-gerard-portfolio.fly.dev',
  'https://marleegerard.com',
  'https://mgportfolioimages.s3.us-east-1.amazonaws.com',
];

async function bootstrap() {
  await connectDatabase();

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;

  app.use(
    helmet({
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'HEAD'],
    allowedHeaders: ['*'],
    exposedHeaders: ['ETag'],
    maxAge: 3000,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
  console.log(
    `🌎 ==> API server now on port ${port}!\nEnvironment: ${process.env.NODE_ENV}`,
  );
}

bootstrap();
