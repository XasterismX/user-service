import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import path from "node:path";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
            return{
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: Number(configService.get<string>('DB_PORT')),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB'),
                synchronize: configService.get<string>('DB_SYNCH') === 'true',
                logging: configService.get<string>('DB_LOG') === 'true',
                entities: ['dist/**/*.entity{.ts,.js}'],
                migrations: ['dist/db/migrations/*{.ts,.js}'],
            };
        },
        inject: [ConfigService]
    }),],
    providers: [],
    exports: [],
})
export class DbModule {}
