import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { Item } from './Item';

@Entity({ tableName: 'orders' })
export class Order {
  @PrimaryKey()
  id!: number;

  @Property()
  user!: string;

  @Property()
  date: number;

  @ManyToMany(() => Item, 'orders', { owner: true })
  items = new Collection<Item>(this);
}
