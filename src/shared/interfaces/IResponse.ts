export interface IResponse<T> {
  statusCode: number;
  method: string;
  path: string;
  data: T;
}
