import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.PG_HOST,
        port: 5432,
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        database: 'nest',
      });
      sequelize.addModels([UserModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
