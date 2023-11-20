import todos from "./todos";
import { Todo } from "./type";

const printResult = <T>(action: string, result: T) => {
  const time = new Date().toTimeString();
  const node = document.createElement("p");
  node.textContent = `${action.toUpperCase()}: ${JSON.stringify(
    result
  )} (${time})`;

  document.querySelector("div")?.appendChild(node);
};

const onListClick = async () => {
  const result = await todos.list<Todo[]>();
  printResult("list todos", result);
};

const onAddClick = async () => {
  const result = await todos.create<Todo>("A simple todo Element");
  printResult("add todo", result);
};

const onUpdateClick = async () => {
  const list = await todos.list<Todo[]>();

  const { id } = list[0];
  const newTodo = {
    id,
    completed: true,
  };

  const result = await todos.update<Todo>(newTodo);
  printResult("update todo", result);
};

const onDeleteClick = async () => {
  const list = await todos.list<Todo[]>();
  const { id } = list[0];

  const result = await todos.delete<undefined>(id);
  printResult("delete todo", result);
};

(
  document.querySelector("button[data-list]") as HTMLButtonElement
).addEventListener("click", onListClick);

(
  document.querySelector("button[data-add]") as HTMLButtonElement
).addEventListener("click", onAddClick);

(
  document.querySelector("button[data-update]") as HTMLButtonElement
).addEventListener("click", onUpdateClick);

(
  document.querySelector("button[data-delete]") as HTMLButtonElement
).addEventListener("click", onDeleteClick);
