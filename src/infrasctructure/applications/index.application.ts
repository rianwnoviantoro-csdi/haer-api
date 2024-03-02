import { OrderDirectionEnum } from 'src/commons/enums/index.enum';
import {
  IPaginateRequest,
  IPaginateResponse,
  IPaginationMeta,
} from 'src/commons/interfaces/index.interface';

export abstract class IndexApplication {
  readonly DefaultPerPage: number = 10;
  readonly DefaultPage: number = 1;
  readonly DefaultSort: string = 'created_at';
  readonly DefaultOrder: OrderDirectionEnum = OrderDirectionEnum.DESC;

  abstract fetch(arg0: any, arg1: any): Promise<IPaginateResponse<any>>;

  countOffset({ page, perPage }: IPaginateRequest): number {
    page = page ?? this.DefaultPage;
    perPage = perPage ?? this.DefaultPerPage;

    return (page - 1) * perPage;
  }

  mapMeta(count: number, { page, perPage }: IPaginateRequest): IPaginationMeta {
    page = page ?? this.DefaultPage;
    perPage = perPage ?? this.DefaultPerPage;

    return {
      page: page,
      perPage: perPage,
      total: Number(count),
      totalPage: Math.ceil(count / perPage),
    };
  }
}
