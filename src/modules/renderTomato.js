import { ControllerTomato } from './controllerTomato.js';

export class RenderTomato {
  constructor(instruction) {
    this.controller = new ControllerTomato();
    this.instruction = instruction;
    this.imp = ['default', 'important', 'so-so'];
    this.header = document.createElement('header');
    this.main = document.createElement('main');
    this.count = 0;
    this.changeImportman = 'default';
    this.init();
    this.btnStart = this.main.querySelector('.button-primary');
    this.btnStop = this.main.querySelector('.button-secondary');
    this.submit = this.main.querySelector('.task-form');
    this.btnImportman = this.main.querySelector('.button-importance');
    this.addListener();
    this.btnActive;
    this.popup;
  }

  init() {
    this.header.append(this.renderHeader());
    this.main.append(this.renderMain());
    document.addEventListener('DOMContentLoaded', () => {
      document.body.append(this.header, this.main, this.modal());
    });
  }

  renderHeader() {
    const section = document.createElement('section');
    section.classList.add('header');

    const divHeader = document.createElement('div');
    divHeader.classList.add('container', 'header__container');

    const img = document.createElement('img');
    img.classList.add('header__logo');
    img.src = 'img/svg/noto_tomato.svg';
    img.alt = 'Tomato image';

    const h1 = document.createElement('h1');
    h1.classList.add('header__title');
    h1.textContent = 'Tomato timer';

    divHeader.append(img, h1);
    section.append(divHeader);
    return section;
  }

  renderMain() {
    const section = document.createElement('section');
    section.classList.add('main');

    const divContainer = document.createElement('div');
    divContainer.classList.add('container', 'main__container');

    const divWindow = document.createElement('div');
    divWindow.classList.add('pomodoro-form', 'window');
    divWindow.append(this.windowPanel(), this.windowBody(), this.windowForm());
    divContainer.append(divWindow, this.divTasksList());
    section.append(divContainer);
    return section;
  }
  windowPanel() {
    const windowPanel = document.createElement('div');
    windowPanel.classList.add('window__panel');
    const taskTitle = document.createElement('p');
    taskTitle.classList.add('window__panel-title');

    const taskText = document.createElement('p');
    taskText.classList.add('window__panel-task-text');

    windowPanel.append(taskTitle, taskText);
    return windowPanel;
  }

  windowBody() {
    const windowBody = document.createElement('div');
    windowBody.classList.add('window__body');

    const windowTimer = document.createElement('p');
    windowTimer.classList.add('window__timer-text');
    windowTimer.textContent = '25:00';

    const windowBtn = document.createElement('div');
    windowBtn.classList.add('window__buttons');
    const btnStart = this.btnInit({
      text: 'Старт',
      classBtn: ['button', 'button-primary'],
    });
    const btnStop = this.btnInit({
      text: 'Стоп',
      classBtn: ['button', 'button-secondary', 'hidden'],
    });
    windowBtn.append(btnStart, btnStop);
    windowBody.append(windowTimer, windowBtn);
    return windowBody;
  }


  windowForm() {
    const form = document.createElement('form');
    form.classList.add('task-form');
    form.action = 'submit';
    const importanceBtn = this.btnInit({
      type: 'button',
      classBtn: ['button', 'button-importance', 'default'],
      ariaLabel: 'Указать важность',
    });
    const btnSubmit = this.btnInit({
      type: 'submit',
      text: 'Добавить',
      classBtn: ['button', 'button-primary', 'task-form__add-button'],

    });

    form.append(this.inputInit(), importanceBtn, btnSubmit);
    return form;
  }

  btnInit(options) {
    const btn = document.createElement('button');
    const { text, classBtn, type, ariaLabel, id } = options;
    btn.classList.add(...classBtn);
    const attributes = {
      ...(type && { type }),
      ...(ariaLabel && { ariaLabel }),
      ...(id && { id }),
    };
    for (const [key, value] of Object.entries(attributes)) {
      btn.setAttribute(key, value);
    }
    btn.textContent = text ? text : '';
    return btn;
  }

  inputInit() {
    const input = document.createElement('input');
    input.classList.add('task-name', 'input-primary');
    input.type = 'text';
    input.name = 'task-name';
    input.id = 'task-name';
    input.placeholder = 'название задачи';
    return input;
  }

  divTasksList() {
    const div = document.createElement('div');
    div.classList.add('pomodoro-tasks');

    const divTasks = document.createElement('div');
    divTasks.classList.add('tasks');

    const p = document.createElement('p');
    p.classList.add('tasks__title');
    p.textContent = 'Задачи:';

    const tasksDeadline = document.createElement('p');
    tasksDeadline.classList.add('tasks__deadline');
    tasksDeadline.innerHTML = '1&nbsp;час 30&nbsp;мин';
    divTasks.append(p, this.initUl(), tasksDeadline);

    div.append(divTasks, this.divManual());
    return div;
  }

  initUl() {
    const ul = document.createElement('ul');
    ul.classList.add('tasks__list');
    ul.append(...this.arrayLi(this.controller));
    this.btnActive = ul.querySelectorAll('.tasks__text');
    this.popup = ul.querySelectorAll('.tasks__button');
    if (this.btnActive.length) {
      this.activeTask();
      this.popupToggle();
    }
    return ul;
  }

  initLi(item, index) {
    const li = document.createElement('li');
    li.classList.add('tasks__item', `${item.importance}`);

    const span = document.createElement('span');
    span.classList.add('count-number');
    span.textContent = index + 1;

    const btnTaskActive = this.btnInit({
      classBtn: ['tasks__text'],
      text: item['task-name'],
      id: item.id,
    });

    const btnLi = this.btnInit({
      classBtn: ['tasks__button'],
    });

    const div = document.createElement('div');
    div.classList.add('popup');
    div.append(
      this.btnInit({
        classBtn: ['popup__button', 'popup__edit-button'],
        text: 'Редактировать',
      }),
      this.btnInit({
        classBtn: ['popup__button', 'popup__delete-button'],
        text: 'Удалить',
      }));
    li.append(span, btnTaskActive, btnLi, div);
    return li;
  }

  divManual() {
    const div = document.createElement('div');
    div.classList.add('manual');

    const details = document.createElement('details');
    details.classList.add('manual__details');

    const summary = document.createElement('summary');
    summary.classList.add('manual__title', 'tasks__header-title');
    summary.textContent = 'Инструкция';

    const ol = document.createElement('ol');
    ol.classList.add('manual__list');
    const elemLi = this.instruction.map((item) => {
      const li = document.createElement('li');
      li.classList.add('manual__item');
      li.innerHTML = item;
      return li;
    });
    ol.append(...elemLi);
    details.append(summary, ol);
    div.append(details);
    return div;
  }

  modal() {
    const divOverlay = document.createElement('div');
    divOverlay.classList.add('modal-overlay');

    const divDelete = document.createElement('div');
    divDelete.classList.add('modal-delete');

    const p = document.createElement('p');
    p.classList.add('modal-delete__title');
    divDelete.append(
      p,
      this.btnInit({
        classBtn: ['modal-delete__close-button'],
      }),
      this.btnInit({
        classBtn: ['modal-delete__delete-button', 'button-primary'],
        text: 'Удалить',
      }),
      this.btnInit({
        classBtn: ['modal-delete__cancel-button'],
        text: 'Отмена',
      }),
    );
    divOverlay.append(divDelete);
    return divOverlay;
  }

  addListener() {
    this.btnStart.addEventListener('click', this.start);
    this.btnStop.addEventListener('click', this.start);
    this.submit.addEventListener('submit', this.submitForm);
    this.btnImportman.addEventListener('click', this.importmanTask);
  }

  start = () => {
    this.btnStart.classList.toggle('hidden');
    this.btnStop.classList.toggle('hidden');
    if (this.btnStart.classList.contains('hidden')) {
      const result = this.controller.startTimer();
      console.warn(result);
    }
  };

  popupToggle = () => {
    this.popup.forEach(element => {
      element.addEventListener('click', ({ target }) => {
        const elem = target.closest('li');
        const modalpopup = elem.querySelector('.popup');
        modalpopup.classList.toggle('popup_active');
        const btnDelete = modalpopup.querySelector('.popup__delete-button');
        btnDelete.addEventListener('click', () => {
          this.deleteTask(elem);
        });
      });
    });
  };

  deleteTask = (elem) => {
    const taskId = elem.querySelector('.tasks__text').getAttribute('id');
    const array = this.controller.delete(Number(taskId));
    this.updateTasks(array);
  };

  activeTask = () => {
    this.btnActive.forEach(element => {
      element.addEventListener('click', e => {
        const target = e.target;
        const task = target;
        const taskLi = task.closest('li');
        const tomatoNumber = taskLi.querySelector('span').textContent;
        task.classList.add('tasks__text_active');
        const titleTask = this.main.querySelector('.window__panel-title');
        const taskPanel = this.main.querySelector('.window__panel-task-text');
        taskPanel.textContent = `Томат ${tomatoNumber}`;
        titleTask.textContent = task.textContent;
        this.controller.addActivityTask(Number(task.getAttribute('id')));
      });
    });
  };

  importmanTask = () => {
    this.count += 1;
    if (this.count >= this.imp.length) {
      this.count = 0;
    }
    for (let i = 0; i < this.imp.length; i++) {
      if (this.count === i) {
        this.btnImportman.classList.add(this.imp[i]);
        this.changeImportman = this.imp[i];
      } else {
        this.btnImportman.classList.remove(this.imp[i]);
      }
    }
  };

  submitForm = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    formData.set('importance', this.changeImportman);
    const newTask = Object.fromEntries(formData);
    const newArray = this.controller.pushNewTasks(newTask, this.imp);
    this.updateTasks(newArray);
    target.reset();
  };

  updateTasks(arr) {
    const tasksUl = this.main.querySelector('.tasks__list');
    tasksUl.innerHTML = '';
    tasksUl.append(...this.arrayLi(arr));
    this.btnActive = tasksUl.querySelectorAll('.tasks__text');
    this.popup = tasksUl.querySelectorAll('.tasks__button');
    this.activeTask();
    this.popupToggle();
  }

  arrayLi(controller) {
    const array = controller.taskTimer.tasksList
      .map((item, index) => this.initLi(item, index));
    return array;
  }
}

export default RenderTomato;
