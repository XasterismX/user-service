import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".dev.env"
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
