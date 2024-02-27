import './index.html';
import './scss/index.scss';

class NewTask {
  #id;
  #name;
  #counter;
  constructor(name, counter = 0) {
    this.#id = this.randomID();
    this.#name = name;
    this.#counter = counter;
  }
  randomID() {
    const min = 100000000000;
    const max = 999999999999;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  editName(name) {
    return this.#name = name;
  }

  editCounter(number = 1) {
    return this.#counter += number;
  }

  get counter() {
    return this.#counter;
  }
}

