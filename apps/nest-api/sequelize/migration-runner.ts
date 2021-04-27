import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: 'nest',
});

const umzug = new Umzug({
  migrations: { glob: './migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

export const migrationsUp = (async (event) => {
  await umzug.up();
  console.log({
    executed: await umzug.executed(),
    pending: await umzug.pending(),
  });
})();

export const migrationsDown = (async (event) => {
  await umzug.down();
  console.log({
    executed: await umzug.executed(),
    pending: await umzug.pending(),
  });
})();

export const migrationsStatus = (async (event) => {
  await umzug.pending();
  console.log({
    executed: await umzug.executed(),
    pending: await umzug.pending(),
  });
})();

