import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Orders } from '../../database/entities/orders.entity';
import { Order } from '../models';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepo: Repository<Orders>,
  ) { }

  private orders: Record<string, Order> = {}

  findById(orderId: string): Order {
    return this.orders[ orderId ];
  }

  async create(data: any) {
    const order = {
      user_id: data.userId,
      cart_id: data.cartId,
      payment: JSON.stringify({
        "type": "CASH"
      }),
      delivery: JSON.stringify({
        "type": "SELF"
      }),
      comments: 'First order11',
      status: 'ORDERED',
      total: data.total
    } as Orders;

    try {
      await this.ordersRepo.manager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.insert(Orders, order)
      })
    } catch (error) {
      console.log(error.message);
    }
    return order;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[ orderId ] = {
      ...data,
      id: orderId,
    }
  }
}
