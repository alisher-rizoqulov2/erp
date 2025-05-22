import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Request, Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(LoginDto, res);
  }
  @Post("loginTeacher")
  @HttpCode(200)
  async loginTeacher(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginTeacher(LoginDto, res);
  }
  @Get("log-Out")
  @HttpCode(200)
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signOut(request, response);
  }
  @Get("log-OutTeacher")
  @HttpCode(200)
  async signOutTeacher(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signOutTeacher(request, response);
  }
  @Get("refresh-token")
  async refreshTokenAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(refreshToken, res);
  }
  @Get("refresh-tokenTeacher")
  async refreshTokenTeacher(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenTeacher(refreshToken, res);
  }
}
