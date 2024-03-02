import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderDirectionEnum, OrderDirectionType } from '../enums/index.enum';
import { IPaginateRequest, ISortRequest } from '../interfaces/index.interface';

export class IndexRequest implements ISortRequest, IPaginateRequest {
  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsEnum(OrderDirectionEnum)
  order?: OrderDirectionType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  perPage?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsString()
  @IsOptional()
  search?: string;
}
