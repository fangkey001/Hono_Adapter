export type BaseError = {
  code: string;
  status: 400 | 401 | 403 | 404 | 422 | 500 | number;
  message: string;
};
