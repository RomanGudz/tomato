import './index.html';
import './scss/index.scss';
import { RenderTomato } from './modules/renderTomato.js';


const instruction = [
  'Напишите название задачи чтобы её&nbsp;добавить',
  'Для активации задачи, выберите её&nbsp;из&nbsp;списка',
  'Запустите таймер',
  ' Работайте пока таймер не&nbsp;прозвонит',
  'Сделайте короткий перерыв (5&nbsp;минут)',
  'Продолжайте работать, пока задача не&nbsp;будет выполнена.',
  'Каждые 4&nbsp;периода таймера делайте длинный перерыв (15 - 20&nbsp;минут).',
];

new RenderTomato(instruction);
// const task = new NewTask('study');
// const taskTimer = new TaskTimer({ timeComplete: 3 });
// console.log('taskTimer: ', taskTimer);
// taskTimer.setTask(task);
// console.log('taskTimer: ', taskTimer);
// taskTimer.setActivateTask(task.id)
// .startTask()
// console.log('taskTimer: ', taskTimer);
