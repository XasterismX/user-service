import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserController} from "./user.controller.js";
import {UserService} from "./user.service.js";
import {User} from "./entities/user.entity.js";
import {AuthModule} from "../auth/auth.module.js";
import {DbModule} from "../db/db.module.js";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), DbModule, AuthModule, JwtModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule  {

}
