import { Router, Request, Response, NextFunction } from 'express';

import { DI } from '../../server';
import { Item } from './entities/Item';
import { Order } from './entities/Order';

const router = Router();

router.get(
  '/orders',
  async (req: Request, res: Response, next: NextFunction) => {
    const { simple } = req.query;
    const populate = simple ? undefined : ['items'];
    const em = DI.orm.em.fork();
    try {
      const orders = await em.find(
        Order,
        {},
        {
          populate,
        },
      );
      return res.status(200).send({ orders });
    } catch (error) {
      return next('Error processing values');
    }
  },
);

router.post(
  '/orders',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const em = DI.orm.em.fork();
      const order = em.create(Order, req.body);
      order.items.add(em.create(Item, req.body[0].items));
      await em.persistAndFlush(order);
      return res.status(200).send({ orders: [order] });
    } catch (error) {
      return next('Error processing values');
    }
  },
);

export default router;
