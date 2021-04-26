import { MikroORM } from '@mikro-orm/core';

import { Item } from './entities/Item';
import { Order } from './entities/Order';

export async function initRepositories(): Promise<MikroORM> {
  const orm = await MikroORM.init({
    entities: [Item, Order],
    dbName: process.env.DB_NAME,
    type: 'postgresql',
    clientUrl: 'postgresql://localhost:5430/reviewty',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  return orm;
}
