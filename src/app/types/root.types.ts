export interface IBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  error?: string;
}
