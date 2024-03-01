import {
  ImportantTask,
  StandardTask,
  UnimportantTask,
} from './newTask.js';

export class TaskTimer {
  #time;
  #countTask;
  constructor({
    tasksList = [],
    timeComplete = 0.1,
    timePause = 0.2,
    timeBigPause = 0.15,
  }) {
    if (TaskTimer.newTimer) return TaskTimer.newTimer;
    TaskTimer.newTimer = this;
    this.tasksList = tasksList;
    this.timeComplete = timeComplete * 60;
    this.timeBigPause = timeBigPause * 60;
    this.timePause = timePause * 60;
    this.activateTask = null;
    this.#countTask = 0;
    this.#time = 0 * 60;
  }

  setTask(task, imp) {
    const find = imp.find(item => item === task.importance);
    let Command;
    switch (find) {
      case 'important':
        Command = ImportantTask;
        break;
      case 'so-so':
        Command = UnimportantTask;
        break;
      default:
        Command = StandardTask;
    }
    const command = new Command(task);
    if (command.execute()) {
      this.tasksList.push(command);
    }
    return this;
  }

  setActivateTask(id) {
    const task = this.tasksList.find(task => task.id === id);
    this.activateTask = task;
    this.#countTask++;
    return this;
  }
  startTask() {
    if (this.activateTask === null) {
      return false;
    } else {
      const timerId = setInterval(() => {
        if (this.#time >= this.timeComplete) {
          console.log('Время выполнения задачи истекло');
          this.#time = 0;
          if (this.#countTask > 3) {
            this.startBigPause();
          } else {
            this.startPause();
          }
          clearInterval(timerId);
          return;
        }
        this.#time++;
        this.activateTask.editCounter();
      }, 1000);
      return true;
    }
  }

  startPause() {
    const timerId = setInterval(() => {
      if (this.timePause === this.#time) {
        clearInterval(timerId);
        this.#time = 0;
        this.#countTask++;
        console.log('Время перерыва закончилось');
        return;
      }
      this.#time++;
    }, 1000);
  }

  startBigPause() {
    const timerId = setInterval(() => {
      if (this.timeBigPause === this.#time) {
        clearInterval(timerId);
        console.log('Время перерыва закончилось');
        this.#countTask = 0;
        this.#time = 0;
        return;
      }
      this.#time++;
    }, 1000);
  }

  editCounterActiveTask(id, number) {
    const task = this.tasksList.find(task => task.id === id);
    task.editCounter(number);
    return this;
  }

  deleteTask(id) {
    this.tasksList = this.tasksList.filter(item => item.id !== id);
    return this;
  }

  get time() {
    return this.#time;
  }

  get countTask() {
    return this.#countTask;
  }
}

export default {
  TaskTimer,
};
