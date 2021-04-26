import { Knex } from 'knex';
import kn from 'knex';
import knexStringcase from 'knex-stringcase';

import * as knexConfig from './config';

export type Transaction = Knex.Transaction;

export const knex = kn(knexStringcase(knexConfig));

export const TABLES: { [key: string]: string } = {
  ORDER: 'orders',
  ITEM: 'items',
  ORDER_ITEM: 'orders_items',
};
