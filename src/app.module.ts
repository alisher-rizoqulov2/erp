import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/entities/admin.entity";
import { AuthModule } from "./auth/auth.module";
import { TeacherModule } from "./teacher/teacher.module";
import { Teacher } from "./teacher/entities/teacher.entity";
import { ConfigModule } from "@nestjs/config";
import { StudentsModule } from "./students/students.module";
import { CoursesModule } from "./courses/courses.module";
import { Student } from "./students/entities/student.entity";
import { Course } from "./courses/entities/course.entity";
import { GroupsModule } from "./groups/groups.module";
import { Group } from "./groups/entities/group.entity";
import { TeacherGroupsModule } from "./teacher_groups/teacher_groups.module";
import { TeacherGroup } from "./teacher_groups/entities/teacher_group.entity";
import { StudentGroupsModule } from "./student_groups/student_groups.module";
import { StudentGroup } from "./student_groups/entities/student_group.entity";
import { SchedulesModule } from "./schedules/schedules.module";
import { Schedule } from "./schedules/entities/schedule.entity";
import { AttendancesModule } from "./attendances/attendances.module";
import { Attendance } from "./attendances/entities/attendance.entity";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: "schema.gql",
    //   sortSchema: true,
    //   playground: true,
    // }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORTM),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin],
      synchronize: true,
    }),
    AdminModule,
    AuthModule,
    TeacherModule,
    StudentsModule,
    CoursesModule,
    GroupsModule,
    TeacherGroupsModule,
    StudentGroupsModule,
    SchedulesModule,
    AttendancesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
