import { Module } from '@nestjs/common';

import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module.js";
import {AuthModule} from "./auth/auth.module.js";
import * as path from "node:path";
import {DataSource} from "typeorm";
import {DbModule} from "./db/db.module.js";
import Joi from 'joi';


@Module({
  imports: [UserModule, ConfigModule.forRoot({
    validationSchema: Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.string().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB: Joi.string().required(),
      DB_SYNCH: Joi.string().default('false'),
      DB_LOG: Joi.string().default('false'),
    }),
    validationOptions: { abortEarly: true },
    isGlobal: true,
  }),
    AuthModule,
    DbModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {



}
