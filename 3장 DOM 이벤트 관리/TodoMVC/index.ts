import todosView from "./view/todos";
import counterView from "./view/counter";
import filtersView from "./view/filters";
import appView from "./core/app";
import { applyDiff } from "./core/diff";

import registry from "./core/registry";
import { Events, State } from "./core/type";

registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state: State = {
  todos: [],
  currentFilter: "All",
};

const events: Events = {
  addItem: (text) => {
    state.todos.push({
      text,
      completed: false,
    });
    render();
  },
  updateItem: (index, text) => {
    state.todos[index].text = text;
    render();
  },
  deleteItem: (index) => {
    state.todos.splice(index, 1);
    render();
  },
  toggleItemCompleted: (index) => {
    const { completed } = state.todos[index];
    state.todos[index].completed = !completed;
    render();
  },
  completeAll: () => {
    state.todos.forEach((t) => {
      t.completed = true;
    });
    render();
  },
  clearCompleted: () => {
    state.todos = state.todos.filter((t) => !t.completed);
    render();
  },
  changeFilter: (filter) => {
    state.currentFilter = filter;
    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root") as HTMLElement;

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render();
