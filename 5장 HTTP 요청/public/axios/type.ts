import { RawAxiosRequestHeaders } from "axios";

export type CustomResponse<T> = {
  status: number;
  data: T;
};

export type CustomConfig<T> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers?: RawAxiosRequestHeaders;
  body?: T;
};

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
