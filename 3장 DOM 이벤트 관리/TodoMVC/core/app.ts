import { Events, State, Todo } from "./type";

let template: HTMLTemplateElement | null;

const allTodosCompleted = (todos: Todo[]) => {
  if (todos.length === 0) {
    return false;
  }
  return !todos.find((t) => !t.completed);
};

const noCompletedItemIsPresent = (todos: Todo[]) =>
  !todos.find((t) => t.completed);

const getTemplate = () => {
  if (!template) {
    template = document.getElementById("todo-app") as HTMLTemplateElement;
  }

  return template.content.firstElementChild!.cloneNode(true);
};

const addEvents = (targetElement: HTMLElement, events: Events) => {
  const { clearCompleted, completeAll, addItem } = events;

  (
    targetElement.querySelector(".new-todo") as HTMLInputElement
  ).addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addItem((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = "";
    }
  });

  (
    targetElement.querySelector("input.toggle-all") as HTMLInputElement
  ).addEventListener("click", completeAll);

  (
    targetElement.querySelector(".clear-completed") as HTMLButtonElement
  ).addEventListener("click", clearCompleted);
};

export default (targetElement: HTMLElement, state: State, events: Events) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;

  newApp.innerHTML = "";
  newApp.appendChild(getTemplate());

  if (noCompletedItemIsPresent(state.todos)) {
    newApp.querySelector(".clear-completed")?.classList.add("hidden");
  } else {
    newApp.querySelector(".clear-completed")?.classList.remove("hidden");
  }

  (newApp.querySelector("input.toggle-all") as HTMLInputElement).checked =
    allTodosCompleted(state.todos);

  addEvents(newApp, events);

  return newApp;
};
