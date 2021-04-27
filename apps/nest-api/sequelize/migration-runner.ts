import { Sequelize } from 'sequelize';
import * as Umzug from 'umzug';
import pg from 'pg';
import * as path from 'path';

const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectModule: pg,
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: 'nest',
});

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, '../assets/migrations'),
    params: [
      sequelize.getQueryInterface()
    ]
  },
  logging: console.log,
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize
  }
});

export const migrationsUp = (async () => {
  const up = await umzug.up();
  const status = {
    executed: await umzug.executed(),
    up: up,
    pending: await umzug.pending(),
  };

  console.log(status);
  return status;
});

export const migrationsDown = (async (event) => {
  const down = await umzug.down();
  const status = {
    executed: await umzug.executed(),
    down: down,
    pending: await umzug.pending(),
  };

  console.log(status);
  return status;
});

export const migrationsStatus = (async (event) => {
  const status = {
    executed: await umzug.executed(),
    pending: await umzug.pending(),
  };

  console.log('Status', status);
  return status;
});

