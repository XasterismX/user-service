import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".dev.env"
  }),
    TypeOrmModule.forRootAsync({
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
          migrations: ['src/db/migrations/*{.ts,.js}'],
        }
    }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
