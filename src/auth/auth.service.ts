import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Request, Response } from "express";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { Admin } from "../admin/entities/admin.entity";
import * as bcrypt from "bcrypt";
import { Teacher } from "../teacher/entities/teacher.entity";
import { TeacherService } from "../teacher/teacher.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly teacherService: TeacherService
  ) {}
  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      email: admin.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async generateTokensTeacher(teacher: Teacher) {
    const payload = {
      id: teacher.id,
      is_active: teacher.is_active,
      email: teacher.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async loginAdmin(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const validPasswor = await bcrypt.compare(
      loginDto.password,
      admin.password
    );
    if (!validPasswor) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const tokens = await this.generateTokens(admin);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(1296000000),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;

    return {
      message: "Xush kelibsiz",
      adminId: admin.id,
      accessToken: tokens.accessToken,
    };
  }
  async signOut(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    console.log(refresh_token);
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    const user = await this.jwtService.verifyAsync(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!user) {
      throw new BadRequestException("Token topilmadi");
    }

    const adminData = await this.adminService.findOne(user.id);
    if (!adminData) {
      throw new BadRequestException("Bunday Tokenli shaxs topilmadi");
    }

    // Entity emas deb hisoblab, .update ishlatamiz
    await this.adminService.updateToken(user.id, {
      hashed_refresh_token: "",
    });

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }
  async refreshTokenAdmin(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const admindata = await this.adminService.findOne(admin.id);

      if (!admindata) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateTokens(admindata);

      const newToken = (admindata.hashed_refresh_token = await bcrypt.hash(
        tokens.refreshToken,
        7
      ));
      await this.adminService.updateToken(admindata.id, {
        hashed_refresh_token: newToken,
      });
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: Number(1296000000),
      });

      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
  async loginTeacher(loginDto: LoginDto, res: Response) {
    const teacher = await this.teacherService.findByEmail(loginDto.email);
    if (!teacher) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const validPasswor = await bcrypt.compare(
      loginDto.password,
      teacher.password
    );
    if (!validPasswor) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const tokens = await this.generateTokensTeacher(teacher);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(1296000000),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    teacher.hashed_refresh_token = hashed_refresh_token;

    return {
      message: "Xush kelibsiz",
      teacherId: teacher.id,
      accessToken: tokens.accessToken,
    };
  }
  async signOutTeacher(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    console.log(refresh_token);
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    const user = await this.jwtService.verifyAsync(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!user) {
      throw new BadRequestException("Token topilmadi");
    }

    const adminData = await this.teacherService.findOne(user.id);
    if (!adminData) {
      throw new BadRequestException("Bunday Tokenli shaxs topilmadi");
    }

    // Entity emas deb hisoblab, .update ishlatamiz
    await this.teacherService.updateToken(user.id, {
      hashed_refresh_token: "",
    });

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }
  async refreshTokenTeacher(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const admindata = await this.teacherService.findOne(admin.id);

      if (!admindata) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateTokensTeacher(admindata);

      const newToken = (admindata.hashed_refresh_token = await bcrypt.hash(
        tokens.refreshToken,
        7
      ));
      await this.teacherService.updateToken(admindata.id, {
        hashed_refresh_token: newToken,
      });
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: Number(1296000000),
      });

      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
}
