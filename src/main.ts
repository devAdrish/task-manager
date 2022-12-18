import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function start() {
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
start();
