import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [ModelsModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
