export interface IBase {
  id: string;
  createAt: Date;
  updateAt: Date;
}

export interface IResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  error?: string;
}
