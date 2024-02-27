export class TaskTimer {
  #time;
  constructor({
    tasksList = [],
    timeComplete = 25,
    timePause = 5,
    timeBigPause = 15,
  }) {
    this.tasksList = tasksList;
    this.timeComplete = timeComplete * 60;
    this.timeBigPause = timeBigPause * 60;
    this.timePause = timePause * 60;
    this.activateTask = null;
    this.#time = 0 * 60;
  }

  setTask(task) {
    this.tasksList.push(task);
    return this;
  }

  setActivateTask(id) {
    const task = this.tasksList.find(task => task.id === id);
    this.activateTask = task;
    return this;
  }

  startTask() {
    if (this.activateTask === null) {
      console.warn('У вас нет активной задачи');
      return;
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
