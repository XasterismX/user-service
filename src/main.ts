import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConsoleLogger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
      colors: true,
      json: true,
      timestamp: true,
      prefix: "APP",
      logLevels: ["log", "warn","error", "debug"]

    })
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>("PORT") ?? 3000, () =>{
    console.log("App Started")
  });
}
bootstrap();
