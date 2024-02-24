import './index.html';
import './scss/index.scss';

class NewTask {
  #id;
  #name;
  #counter;
  constructor(id, name, counter = 0) {
    this.#id = id;
    this.#name = name;
    this.#counter = counter;
  }

  editName(name) {
    return this.#name = name;
  }

  editCounter(number = 1) {
    return this.#counter += number;
  }
}

