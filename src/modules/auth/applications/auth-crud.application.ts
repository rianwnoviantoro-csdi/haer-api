import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/services/user.service';
import { RegisterRequest } from '../request/register.request';
import { IUser } from 'src/entities/user.entity';
import { LoginRequest } from '../request/login.request';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';

@Injectable()
export class AuthCRUDApplication {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(body: RegisterRequest): Promise<IUser> {
    const exist = await this.userService.findByEmail(body.email);

    if (exist) {
      throw new ConflictException(`Account already exist.`, null);
    }

    const hashPassword = await this.userService.getHash(body.password);

    const result = await this.userService.create({
      ...body,
      email: body.email.toLowerCase(),
      password: hashPassword,
    });

    delete body.password
    delete result.password

    return result
  }

  async authenticate(
    body: LoginRequest,
    req: Request,
    res: Response,
  ): Promise<{ user: IUser; token: string }> {
    const cookies = req.cookies;

    const exist = await this.userService.findByEmail(body.email);

    const isMatchPassword = await this.userService.compareHash(
      body.password,
      exist.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException(`Invalid credentials. Failed login.`, null);
    }

    if (!exist.isActive) {
      throw new ForbiddenException(`Your account has been banned.`, null);
    }

    const accessToken = this.jwtService.sign({
      id: exist.id,
      name: `${exist.fistName} ${exist.lastName}`,
    });

    const newRefreshToken = this.generateRefreshToken({
      id: exist.id,
      name: `${exist.fistName} ${exist.lastName}`,
    });

    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
      });
    }

    await this.userService.update(exist.id, {
      refreshToken: newRefreshToken,
    });

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
    });

    delete body.password;
    delete exist.password;
    delete exist.refreshToken;

    return { user: exist, token: accessToken };
  }

  async refreshToken(
    req: Request,
    res: Response,
  ): Promise<{ user: IUser; token: string }> {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw new UnauthorizedException('No token provided.', null);
    }

    const refreshToken = cookies.jwt;

    res.clearCookie('jwt', { httpOnly: true });

    const exist = await this.userService.findByToken(refreshToken);

    if (!exist) {
      const decodedToken = this.jwtService.decode(refreshToken);

      await this.userService.update(decodedToken.id, {
        isActive: false,
      });

      throw new ForbiddenException('Forbidden.', null);
    }

    const accessToken = this.jwtService.sign({
      id: exist.id,
      name: `${exist.fistName} ${exist.lastName}`,
    });

    const newRefreshToken = this.generateRefreshToken({
      id: exist.id,
      name: `${exist.fistName} ${exist.lastName}`,
    });

    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
      });
    }

    await this.userService.update(exist.id, {
      refreshToken: newRefreshToken,
    });

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
    });

    delete exist.password;
    delete exist.refreshToken;

    return { user: exist, token: accessToken };
  }

  generateRefreshToken(payload: { id: string; name: string }): string {
    const refreshTokenService = new JwtService({
      secret: config.jwt.refreshSecret,
    });

    return refreshTokenService.sign(payload, {
      expiresIn: config.jwt.refreshExpire,
    });
  }
}
