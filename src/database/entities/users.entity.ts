import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'string', nullable: false })
    name: string;
  
    @Column({ type: 'string', nullable: true })
    email: string;
  
    @Column({ type: 'string', nullable: true })
    password: string;
  }
  