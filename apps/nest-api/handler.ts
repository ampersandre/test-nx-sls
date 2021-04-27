import { APIGatewayProxyHandler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app/app.module';
import { eventContext } from 'aws-serverless-express/middleware';
import { Server } from 'http';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';


let cachedServer: Server;

async function bootstrapServer() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(eventContext());
  await app.init();
  return createServer(expressApp);
}

export const webApp: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
