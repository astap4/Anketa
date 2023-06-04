import ClockModel from './Clock.js';
import ClockControllerButtons from './ClockControllerButtons.js';
import ClockViewDom from './ClockViewDom.js';
import ClockViewSvg from './ClockViewSvg.js';
import ClockViewCanvas from './ClockViewCanvas.js';

// создаём все три компонента
const clock1 = new ClockModel();
const view1 = new ClockViewDom();
const controller1 = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const containerElem1 = document.querySelector('.clockContainer1');
const btnStart1 = document.getElementById('btnStart1');
const btnStop1 = document.getElementById('btnStop1');
// увязываем компоненты друг с другом
clock1.start(view1);
view1.start(clock1, containerElem1);
controller1.start(clock1, containerElem1, btnStart1, btnStop1);

// создаём все три компонента
const clock2 = new ClockModel();
const view2 = new ClockViewDom();
const controller2 = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const containerElem2 = document.querySelector('.clockContainer2');
const btnStart2 = document.getElementById('btnStart2');
const btnStop2 = document.getElementById('btnStop2');
// увязываем компоненты друг с другом
clock2.start(view2);
view2.start(clock2, containerElem2);
controller2.start(clock2, containerElem2, btnStart2, btnStop2);

// создаём все три компонента
const clock3 = new ClockModel();
const view3 = new ClockViewSvg();
const controller3 = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const containerElem3 = document.querySelector('.clockContainer3');
const btnStart3 = document.getElementById('btnStart3');
const btnStop3 = document.getElementById('btnStop3');
// увязываем компоненты друг с другом
clock3.start(view3);
view3.start(clock3, containerElem3);
controller3.start(clock3, containerElem3, btnStart3, btnStop3);
// создаём все три компонента
const clock4 = new ClockModel();
const view4 = new ClockViewSvg();
const controller4 = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const containerElem4 = document.querySelector('.clockContainer4');
const btnStart4 = document.getElementById('btnStart4');
const btnStop4 = document.getElementById('btnStop4');
// увязываем компоненты друг с другом
clock4.start(view4);
view4.start(clock4, containerElem4);
controller4.start(clock4, containerElem4, btnStart4, btnStop4);
// создаём все три компонента
const clock5 = new ClockModel();
const view5 = new ClockViewCanvas();
const controller5 = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const containerElem5 = document.querySelector('.clockContainer5');
const btnStart5 = document.getElementById('btnStart5');
const btnStop5 = document.getElementById('btnStop5');
// увязываем компоненты друг с другом
clock5.start(view5);
view5.start(clock5, containerElem5);
controller5.start(clock5, containerElem5, btnStart5, btnStop5);
// создаём все три компонента
const clock6 = new ClockModel();
const view6 = new ClockViewCanvas();
const controller6 = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const containerElem6 = document.querySelector('.clockContainer6');
const btnStart6 = document.getElementById('btnStart6');
const btnStop6 = document.getElementById('btnStop6');
// увязываем компоненты друг с другом
clock6.start(view6);
view6.start(clock6, containerElem6);
controller6.start(clock6, containerElem6, btnStart6, btnStop6);

// инициируем первичное отображение Model во View
clock1.updateView();
clock1.startClock("Нью-Йорк (GMT-5)");
clock2.updateView();
clock2.startClock("Лондон (GMT)");
clock3.updateView();
clock3.startClock("Берлин (GMT+1)");
clock4.updateView();
clock4.startClock("Минск (GMT+3)");
clock5.updateView();
clock5.startClock("Токио (GMT+9)");
clock6.updateView();
clock6.startClock("Владивосток (GMT+10)");