import { Module } from '@nestjs/common';
import { UserModel } from './user.model';

@Module({
  imports: [UserModel],
})
export class ModelsModule {}
