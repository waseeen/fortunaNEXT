import { DataSource } from 'typeorm';
import { startBot } from '../client';

const db = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: <number>(<unknown>process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [__dirname + '/../database/**.entity.*'],
});

db.initialize().then(() => {
  console.log('Database ready');
  startBot();
});

export default db;
