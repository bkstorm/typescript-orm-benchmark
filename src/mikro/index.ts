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
    try {
      const orders = await DI.orderRepository.find(
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
      const order = DI.orm.em.create(Order, req.body);
      order.items.add(DI.orm.em.create(Item, req.body[0].items));
      await DI.orm.em.persistAndFlush(order);
      return res.status(200).send({ orders: [order] });
    } catch (error) {
      return next('Error processing values');
    }
  },
);

export default router;
