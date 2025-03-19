import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'board_app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}