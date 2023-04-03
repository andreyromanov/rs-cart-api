import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './entities/cart.entity';
import { Cart_items } from './entities/cart_items.entity';
import { Orders } from './entities/orders.entity';
import { Users } from './entities/users.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartModule } from '../cart/cart.module';
import { OrderModule } from '../order/order.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        forwardRef(() => CartModule),
        forwardRef(() => OrderModule),
        forwardRef(() => UsersModule)
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['dist/database/entities/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Carts, Cart_items, Orders, Users]),
  ],
  exports: [TypeOrmModule],
})

export class DatabaseModule {}
