import { Events, State, Todo } from "../core/type";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item") as HTMLTemplateElement;
  }

  return template.content.firstElementChild?.cloneNode(
    true
  ) as HTMLInputElement;
};

const attachEventsToTodoElement = (
  element: HTMLElement,
  index: number,
  events: Events
) => {
  const handler = (e: Event) => events.deleteItem(index);

  (
    element.querySelector("button.destroy") as HTMLButtonElement
  ).addEventListener("click", handler);

  (element.querySelector("input.toggle") as HTMLInputElement).addEventListener(
    "click",
    (e) => events.toggleItemCompleted(index)
  );

  element.addEventListener("dblclick", () => {
    element.classList.add("editing");
    (element.querySelector("input.edit") as HTMLInputElement).focus();
  });

  (element.querySelector("input.edit") as HTMLInputElement).addEventListener(
    "keypress",
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        element.classList.remove("editing");
        events.updateItem(index, (e.target as HTMLInputElement).value);
      }
    }
  );
};

const getTodoElement = (todo: Todo, index: number, events: Events) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  (element.querySelector("input.edit") as HTMLInputElement).value = text;
  (element.querySelector("label") as HTMLLabelElement).textContent = text;

  if (completed) {
    element.classList.add("completed");
    (element.querySelector("input.toggle") as HTMLInputElement).checked = true;
  }

  attachEventsToTodoElement(element, index, events);

  return element;
};

const filterTodos = (todos: Todo[], filter: string) => {
  const isCompleted = (todo: Todo) => todo.completed;
  if (filter === "Active") {
    return todos.filter((t) => !isCompleted(t));
  }

  if (filter === "Completed") {
    return todos.filter(isCompleted);
  }

  return [...todos];
};

export default (targetElement: HTMLElement, state: State, events: Events) => {
  const { todos, currentFilter } = state;
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;

  newTodoList.innerHTML = "";

  const filteredTodos = filterTodos(todos, currentFilter);

  filteredTodos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach((element) => {
      newTodoList.appendChild(element);
    });

  return newTodoList;
};
