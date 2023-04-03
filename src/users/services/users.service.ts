import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models';
import { Users } from '../../database/entities/users.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) { 
    this.users = {}
  }
  private readonly users: Record<string, User>;

  async findOne(userId: string): Promise<any> {
    return this.usersRepo.findOne({
      where: {
        id: userId,
    },
    });
  }

  async createOne({ name, password }: User): Promise<User> {
    const id = v4(v4());
    
    const newUser = { id: name || id, name, password };
    const user = await this.usersRepo.insert(newUser);

    return {...newUser, id: user.raw[0].id};
  }

}
