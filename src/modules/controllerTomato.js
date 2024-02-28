import { TaskTimer } from './taskTimer.js';

export class ControllerTomato {
  constructor() {
    this.taskTimer = new TaskTimer({});
  }
  pushNewTasks(task, imp) {
    this.taskTimer.setTask(task, imp);
    return this;
  }
  addActivityTask(id) {
    this.taskTimer.setActivateTask(id);
    return this;
  }

  startTimer() {
    return this.taskTimer.startTask();
  }

  editTimerTask(id, number) {
    this.taskTimer.activateTask(id, number);
    return this;
  }

  delete(id) {
    this.taskTimer.deleteTask(id);
    return this;
  }
}

export default ControllerTomato;
