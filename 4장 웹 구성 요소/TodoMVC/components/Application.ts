import { State } from "../core/type";
import { EVENTS } from "./List";

export default class App extends HTMLElement {
  state: State;
  template: HTMLTemplateElement;
  // TODO: type을 어떻게 줘야할까..
  list: any;
  footer: any;

  constructor() {
    super();
    this.state = {
      todos: [],
      filter: "All",
    };

    this.template = document.getElementById("todo-app") as HTMLTemplateElement;
  }

  deleteItem(index: number) {
    this.state.todos.splice(index, 1);
    this.syncAttributes();
  }

  addItem(text: string) {
    this.state.todos.push({
      text,
      completed: false,
    });
    this.syncAttributes();
  }

  syncAttributes() {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template.content.firstElementChild?.cloneNode(
        true
      ) as HTMLElement;

      this.appendChild(content);

      (this.querySelector(".new-todo") as HTMLInputElement).addEventListener(
        "keypress",
        (e: KeyboardEvent) => {
          if (e.key === "Enter") {
            this.addItem((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }
      );

      this.footer = this.querySelector("todomvc-footer");

      document.addEventListener("onclick", (e) => console.log(e));

      this.list = this.querySelector("todomvc-list");
      // TODO: event의 타입을 어떻게..?
      this.list.addEventListener(EVENTS.DELETE_ITEM, (e: CustomEvent) => {
        this.deleteItem(e.detail.index);
      });

      this.syncAttributes();
    });
  }
}
