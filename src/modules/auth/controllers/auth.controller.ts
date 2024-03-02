import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthApplication } from '../applications/auth.application';
import { RegisterRequest } from '../request/register.request';
import { IApiResponse } from 'src/commons/interfaces/response.interface';
import { LoginRequest } from '../request/login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  @Post('/register')
  async create(@Body() body: RegisterRequest): Promise<IApiResponse<any>> {
    const response = await this.application.create(body);

    return {
      message: 'Success.',
      data: response,
    };
  }

  @Post('/login')
  async authenticate(
    @Body() body: LoginRequest,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IApiResponse<any>> {
    const response = await this.application.authenticate(body, req, res);

    return {
      message: 'Success.',
      data: response,
    };
  }

  @Get('/refresh-token')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): Promise<IApiResponse<any>> {
    const response = await this.application.refreshToken(req, res);

    return {
      message: 'Success.',
      data: response,
    };
  }
}
