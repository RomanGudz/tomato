import './index.html';
import './scss/index.scss';

import { NewTask } from './modules/newTask.js';
import {
  TaskTimer,
} from './modules/taskTimer.js';

const task = new NewTask('study');
const taskTimer = new TaskTimer({ timeComplete: 3 });
console.log('taskTimer: ', taskTimer);
taskTimer.setTask(task);
console.log('taskTimer: ', taskTimer);
taskTimer.setActivateTask(task.id)
// .startTask()
console.log('taskTimer: ', taskTimer);
