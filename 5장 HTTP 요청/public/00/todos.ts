import http from "./http";
import { Todo } from "./type";

const HEADERS: HeadersInit = {
  "Content-Type": "application/json",
};

const BASE_URL = "http://localhost:8080/api/todos";

const list = <T>(): Promise<T> => http.get<T>(BASE_URL);

const create = <T>(text: string): Promise<T> => {
  const todo: Omit<Todo, "id"> = {
    text,
    completed: false,
  };

  return http.post<T, Omit<Todo, "id">>(BASE_URL, todo, HEADERS);
};

const update = <T>(newTodo: Omit<Todo, "text">) => {
  const url = `${BASE_URL}/${newTodo.id}`;
  return http.patch<T, Omit<Todo, "text">>(url, newTodo, HEADERS);
};

const deleteTodo = <T>(id: number) => {
  const url = `${BASE_URL}/${id}`;
  return http.delete<T>(url);
};

export default {
  list,
  create,
  update,
  delete: deleteTodo,
};
