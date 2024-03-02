import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { AuthCRUDApplication } from './applications/auth-crud.application';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: config.jwt.tokenSecret,
      signOptions: { expiresIn: config.jwt.tokenExpire },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthCRUDApplication],
})
export class AuthModule {}
