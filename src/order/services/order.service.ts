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

  create(data: any) {
    return this.ordersRepo.create({
      user_id: data.userId,
      cart_id: data.cartId,
      payment: {
        "type": "CASH"
      },
      delivery: {
        "type": "SELF"
      },
      comments: 'First order',
      status: 'ORDERED',
      total: data.total
    });
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
