import { Todo } from "../core/type";

const TEMPLATE = '<ul class="todo-list"></ul>';

export const EVENTS = {
  DELETE_ITEM: "DELETE_ITEM",
};

export default class List extends HTMLElement {
  itemTemplate: HTMLTemplateElement | undefined;
  list: HTMLElement | undefined;

  static get observedAttributes() {
    return ["todos"];
  }

  get todos() {
    if (!this.hasAttribute("todos")) {
      return [];
    }

    return JSON.parse(this.getAttribute("todos") as string);
  }

  set todos(value) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  onDeleteClick(index: string) {
    const event = new CustomEvent(EVENTS.DELETE_ITEM, {
      detail: {
        index,
      },
    });

    this.dispatchEvent(event);
  }

  createNewTodoNode() {
    return (
      this.itemTemplate?.content.firstElementChild as HTMLElement
    ).cloneNode(true) as HTMLElement;
  }

  getTodoElement(todo: Todo, index: string) {
    const { text, completed } = todo;

    const element = this.createNewTodoNode();

    (element.querySelector("input.edit") as HTMLInputElement).value = text;
    (element.querySelector("label") as HTMLLabelElement).textContent = text;

    if (completed) {
      element.classList.add("completed");
      (element.querySelector("input.toggle") as HTMLInputElement).checked =
        true;
    }

    (element.querySelector("button.destroy") as HTMLElement).dataset.index =
      index;

    return element;
  }

  updateList() {
    (this.list as HTMLElement).innerHTML = "";

    this.todos.map(this.getTodoElement).forEach((element: HTMLElement) => {
      this.list?.appendChild(element);
    });
  }

  connectedCallback() {
    this.innerHTML = TEMPLATE;
    this.itemTemplate = document.getElementById(
      "todo-item"
    ) as HTMLTemplateElement;

    this.list = this.querySelector("ul") as HTMLUListElement;

    this.list?.addEventListener("click", (e) => {
      if ((e.target as HTMLButtonElement).matches("button.destroy")) {
        this.onDeleteClick((e.target as HTMLElement).dataset.index as string);
      }
    });

    this.updateList();
  }

  attributeChangedCallback() {
    this.updateList();
  }
}
