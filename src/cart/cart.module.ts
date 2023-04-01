import { Module, forwardRef } from '@nestjs/common';

import { OrderModule } from '../order/order.module';
import { DatabaseModule } from '../database/database.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [ forwardRef(() => DatabaseModule), OrderModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
