import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { Order } from './Order';

@Entity({ tableName: 'items' })
export class Item {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  value!: number;

  @ManyToMany(() => Order, (order) => order.items)
  orders = new Collection<Order>(this);
}
