import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from './admin/admin.module';
import { Admin } from "./admin/entities/admin.entity";
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from "./teacher/entities/teacher.entity";
import { ConfigModule } from "@nestjs/config";
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { Student } from "./students/entities/student.entity";
import { Course } from "./courses/entities/course.entity";

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
      entities: [Admin, Teacher,Student,Course],
      synchronize: true,
    }),
    AdminModule,
    AuthModule,
    TeacherModule,
    StudentsModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
