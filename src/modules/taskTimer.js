import {
  ImportantTask,
  StandardTask,
  UnimportantTask,
} from './newTask.js';

export class TaskTimer {
  #time;
  constructor({
    tasksList = [],
    timeComplete = 25,
    timePause = 5,
    timeBigPause = 15,
  }) {
    if (TaskTimer.newTimer) return TaskTimer.newTimer;
    TaskTimer.newTimer = this;
    this.tasksList = tasksList;
    this.timeComplete = timeComplete * 60;
    this.timeBigPause = timeBigPause * 60;
    this.timePause = timePause * 60;
    this.activateTask = null;
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
    return this;
  }

  startTask() {
    if (this.activateTask === null) {
      return 'У вас нет активной задачи';
    } else {
      const timerId = setInterval(() => {
        if (this.#time >= this.timeComplete) {
          console.log('Время выполнения задачи истекло');
          this.#time = 0;
          if (this.activateTask.counter > 3) {
            this.startBigPause();
          } else {
            this.startPause();
          }
          clearInterval(timerId);
          return;
        }
        console.clear();
        this.#time++;
        this.activateTask.editCounter();
        console.log(this.activateTask.counter);
      }, 1000);
    }
  }
  startPause() {
    const timerId = setInterval(() => {
      if (this.timePause === this.#time) {
        clearInterval(timerId);
        this.#time = 0;
        console.log('Время перерыва закончилось');
        return;
      }
      console.clear();
      this.#time++;
      console.log(this.#time);
    }, 1000);
  }
  startBigPause() {
    const timerId = setInterval(() => {
      if (this.timeBigPause === this.#time) {
        clearInterval(timerId);
        console.log('Время перерыва закончилось');
        this.#time = 0;
        return;
      }
      console.clear();
      this.#time++;
      console.log(this.#time);
    }, 1000);
  }

  editCounterActiveTask(id, number) {
    const task = this.tasksList.find(task => task.id === id);
    task.editCounter(number);
    return this;
  }
}

export default {
  TaskTimer,
};
