import { Injectable } from '@nestjs/common';


import { Cart } from '../models';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Carts } from '../../database/entities/cart.entity';
import { Cart_items } from '../../database/entities/cart_items.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private readonly cartRepo: Repository<Carts>,
    @InjectRepository(Cart_items)
    private readonly cartItemsRepo: Repository<Cart_items>,
  ) { }
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Carts> {
    const res = await this.cartRepo.findOne({
      where: { user_id: userId },
      relations: ['items']
    });

    return res;
  }

  async createByUserId(userId: string) {
    try {
      const res = await this.cartRepo.insert({
        user_id: userId,
        created_at: '2023-03-31',
        updated_at: '2023-03-31',
        status: 'OPEN'
      });
      const userCart = {
        id: res.raw[0].id,
        items: [],
      };
      return userCart;
    } catch (e) {
      console.log(e);
    }
  }

  async findOrCreateByUserId(userId: string): Promise<any> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    }
    
    updatedCart.items.forEach(item => {
      // hardcoded price 
      item.product = {
        price: 100
      }
    });
    const votesEntities = this.cartItemsRepo.create(updatedCart.items);

    await this.cartItemsRepo.save(votesEntities)
    
    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }

}
