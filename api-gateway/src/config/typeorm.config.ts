import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: 'order-management-system',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
