import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Carts } from './cart.entity';
  
  @Entity()
  export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'uuid', nullable: false })
    user_id: string;
  
    @OneToOne(() => Carts)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart_id: string;

    @Column({ type: 'json', nullable: false })
    payment: string;

    @Column({ type: 'json', nullable: false })
    delivery: string;

    @Column({ type: 'text', nullable: false })
    comments: string;

    @Column({ type: 'enum', enum: ['IN_PROGRESS', 'ORDERED'], nullable: false })
    status: 'IN_PROGRESS' | 'ORDERED';

    @Column({ type: 'float', nullable: false })
    total: number;
  }
  