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
    path: path.join(__dirname, './migrations'),
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

export const migrationsUp = (async (event) => {
  await umzug.up();
  console.log({
    executed: await umzug.executed(),
    pending: await umzug.pending(),
  });
});

export const migrationsDown = (async (event) => {
  await umzug.down();
  console.log({
    executed: await umzug.executed(),
    pending: await umzug.pending(),
  });
});

export const migrationsStatus = (async (event) => {
  await umzug.pending();
  console.log({
    executed: await umzug.executed(),
    pending: await umzug.pending(),
  });
});

