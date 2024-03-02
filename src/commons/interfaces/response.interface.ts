import { IPaginationMeta } from './index.interface';

export interface IApiResponse<T> {
  message: string;
  meta?: IPaginationMeta;
  data: T;
}
