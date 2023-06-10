import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3006,
  username: 'root',
  password: '',
  database: 'travel_hotline',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
