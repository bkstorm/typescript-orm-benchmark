import express from 'express';
import bodyParser from 'body-parser';
import { MikroORM, EntityRepository } from '@mikro-orm/core';

import knex from './src/knex';
import objection from './src/objection';
import sequelize from './src/sequelize';
import { initializeTypeOrm } from './src/typeorm';
import { initRepositories } from './src/mikro/db';
import mikroOrm from './src/mikro';
import { Order } from './src/mikro/entities/Order';

const DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10;
const DEFAULT_PARAMETER_LIMIT = 10000;
const PORT = 8080;

export let DI: { orm: MikroORM; orderRepository: EntityRepository<Order> };

async function bootstrap(): Promise<void> {
  const app = express();

  const typeOrmRouter = await initializeTypeOrm();
  const orm = await initRepositories();
  DI = { orm, orderRepository: orm.em.getRepository(Order) };

  // Client must send "Content-Type: application/json" header
  app.use(
    bodyParser.json({
      limit: DEFAULT_BODY_SIZE_LIMIT,
    }),
  );

  app.use(
    bodyParser.urlencoded({
      extended: true,
      parameterLimit: DEFAULT_PARAMETER_LIMIT,
    }),
  );

  app.use('/sequelize', sequelize);
  app.use('/objection', objection);
  app.use('/knex', knex);
  app.use('/typeorm', typeOrmRouter);
  app.use('/mikro', mikroOrm);

  app.listen(PORT);
  console.log(`Listening on port: ${PORT}`);
}

bootstrap();
