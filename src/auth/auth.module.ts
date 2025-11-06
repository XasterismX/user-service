import { Module } from '@nestjs/common';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {AuthService} from "./auth.service.js";
import {AuthGuard} from "./auth.guard.js";
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
  imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET')
  }), inject: [ConfigService]}
  )],
  providers: [AuthService, JwtService],
  exports: [AuthService]
})
export class AuthModule {}
