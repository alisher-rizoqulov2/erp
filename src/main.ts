import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";


async function start() {
  try {
    const PORT = process.env.DB_PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    await app.listen(PORT, () => {
      console.log(`🚀 Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
