export type FetchResponse<T> = {
  status: number;
  data: T;
};

export type FetchConfig<T> = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers?: HeadersInit;
  body?: T;
};

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
