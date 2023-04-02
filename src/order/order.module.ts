import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './services';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [ forwardRef(() => DatabaseModule) ],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
