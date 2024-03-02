import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateRequest {
  @IsOptional()
  @IsString()
  fistName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  refreshToken: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
