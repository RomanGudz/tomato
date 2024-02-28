export class NewTask {
  #id;
  #counter;
  #importance;
  constructor({ 'task-name': text, counter = 0, importance }) {
    const proto = Object.getPrototypeOf(this);
    if (proto.constructor === NewTask) {
      throw new Error('Невозможно создать из абстрактоного класса');
    }
    this.#id = this.randomID();
    this['#task-name'] = text;
    this.#counter = counter;
    this.#importance = importance;
  }
  randomID() {
    const min = 100000000000;
    const max = 999999999999;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  editText(text) {
    return this['#task-name'] = text;
  }

  editCounter(number = 1) {
    return this.#counter += number;
  }

  get 'task-name'() {
    return this['#task-name'];
  }

  get importance() {
    return this.#importance;
  }

  get counter() {
    return this.#counter;
  }
  execute() {
    throw new Error('Not implemented')
  }
}

export class ImportantTask extends NewTask {
  execute() {
    if (this.importance === 'important') {
      console.log(this);
      return true;
    }
  }
}

export class StandardTask extends NewTask {
  execute() {
    if (this.importance === 'default') {
      console.log(this);
      return true;
    }
  }
}

export class UnimportantTask extends NewTask {
  execute() {
    if (this.importance === 'so-so') {
      console.log(this);
      return true;
    }
  }
}

export default {
  ImportantTask,
  StandardTask,
  UnimportantTask,
};
