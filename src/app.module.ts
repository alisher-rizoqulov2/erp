import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from './admin/admin.module';
import { Admin } from "./admin/entities/admin.entity";
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from "./teacher/entities/teacher.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORTM),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin, Teacher],
      synchronize: true,
    }),
    AdminModule,
    AuthModule,
    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
