import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthCRUDApplication } from '../applications/auth-crud.application';
import { RegisterRequest } from '../request/register.request';
import { IApiResponse } from 'src/commons/interfaces/response.interface';
import { LoginRequest } from '../request/login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly crudApplication: AuthCRUDApplication) {}

  @Post('/register')
  async create(@Body() body: RegisterRequest): Promise<IApiResponse<any>> {
    const response = await this.crudApplication.create(body);

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
    const response = await this.crudApplication.authenticate(body, req, res);

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
    const response = await this.crudApplication.refreshToken(req, res);

    return {
      message: 'Success.',
      data: response,
    };
  }
}
