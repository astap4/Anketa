const inputField = document.getElementById('inputField');
const diameterElem = document.getElementById('diameter');
const btn = document.getElementById('btn');
const clock = document.getElementById('clock');

const MIN_DIAMETR = 200;
const MAX_DIAMETR = 800;
const HOUR_CIRCLE_SIZE = 0.14;
const SEC_ARR_LENGTH = 0.8;
const SEC_ARR_WIDTH = 0.01;
const MIN_ARR_LENGTH = 0.6;
const MIN_ARR_WIDTH = 0.035;
const HOUR_ARR_LENGTH = 0.4;
const HOUR_ARR_WIDTH = 0.07;

btn.addEventListener('onclick', build);

function build() {
  const diametr = Number(diameterElem.value);
  const circleElement = clock.getElementById('clockCircle');
  if (isNaN(diametr) || diametr < MIN_DIAMETR || diametr > MAX_DIAMETR) {
    alert(`Диаметр должен быть в пределах ${MIN_DIAMETR} и ${MAX_DIAMETR}`);
    return;
  }
  inputField.innerHTML = '';
  clock.classList.remove('hidden');
  clock.setAttribute('width', `${diametr}`);
  clock.setAttribute('height', `${diametr}`);
  const smallDiametr = diametr * HOUR_CIRCLE_SIZE;
  const radius = diametr / 2;
  circleElement.setAttribute('r', `${radius}`);
  circleElement.setAttribute('cx', `${radius}`);
  circleElement.setAttribute('cy', `${radius}`);
  for (let i = 0; i < 12; i++) {
    const hourCell = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hourCell.classList.add('hourCircle');
    hourCell.setAttribute('r', `${smallDiametr / 2}`);
    const angle = i * (360 / 12); // угол поворота
    const x = radius + radius*SEC_ARR_LENGTH * Math.sin(angle * Math.PI / 180); // вычисляем координату x
    const y = radius - radius*SEC_ARR_LENGTH * Math.cos(angle * Math.PI / 180);// вычисляем координату y
    hourCell.setAttribute('cx', `${x}`);
    hourCell.setAttribute('cy', `${y}`);
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text"); // создаем элемент текста
    textElement.setAttribute("x", `${x}`); // устанавливаем позицию текста по оси x
    textElement.setAttribute("y", `${y}`); // устанавливаем позицию текста по оси y
    textElement.textContent = (i === 0) ? 12 : i;// заменяем 0 на 12
    clock.append(hourCell);
    clock.append(textElement); 
  }
  //создаем время
  const time = document.createElementNS("http://www.w3.org/2000/svg", "text"); // создаем элемент текста
  time.setAttribute("x", `${radius}`); // устанавливаем позицию текста по оси x
  time.setAttribute("y", `${radius*MIN_ARR_LENGTH}`); // устанавливаем позицию текста по оси y
  clock.append(time); 
  // создаем стрелки
  const secondArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const minuteArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const hourArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  secondArrow.setAttribute('stroke-width', `${radius*SEC_ARR_WIDTH}`);
  secondArrow.setAttribute("x1", `${radius}`);
  secondArrow.setAttribute("y1", `${radius}`);
  secondArrow.setAttribute("x2", `${radius}`);
  secondArrow.setAttribute("y2", `${SEC_ARR_LENGTH * radius}`);
  minuteArrow.setAttribute('stroke-width', `${radius*MIN_ARR_WIDTH}`);
  minuteArrow.setAttribute("x1", `${radius}`);
  minuteArrow.setAttribute("y1", `${radius}`);
  minuteArrow.setAttribute("x2", `${radius}`);
  minuteArrow.setAttribute("y2", `${MIN_ARR_LENGTH * radius}`);
  hourArrow.setAttribute('stroke-width', `${radius*HOUR_ARR_WIDTH}`);
  hourArrow.setAttribute("x1", `${radius}`);
  hourArrow.setAttribute("y1", `${radius}`);
  hourArrow.setAttribute("x2", `${radius}`);
  hourArrow.setAttribute("y2", `${HOUR_ARR_LENGTH * radius}`);
  clock.append(secondArrow, minuteArrow, hourArrow);

  getTime(radius, time, secondArrow, minuteArrow, hourArrow);
  setInterval(() => { getTime(radius, time, secondArrow, minuteArrow, hourArrow) }, 1000)
}

function getTime(radius, time, secondArrow, minuteArrow, hourArrow) {
  const date = new Date();
  time.textContent = date.toLocaleTimeString();
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const secAngle = 360 / 60 * seconds;
  const minAngle = 360 / 60 * minutes;
  const hourAngle = 360 / 12 * (hours + minutes / 60);
  const xSec = Math.sin(secAngle * Math.PI / 180) * SEC_ARR_LENGTH * radius + radius;
  const ySec = -Math.cos(secAngle * Math.PI / 180) * SEC_ARR_LENGTH * radius + radius;
  const xMin = Math.sin(minAngle * Math.PI / 180) * MIN_ARR_LENGTH * radius + radius;
  const yMin = -Math.cos(minAngle * Math.PI / 180) * MIN_ARR_LENGTH * radius + radius;
  const xHour = Math.sin(hourAngle * Math.PI / 180) * HOUR_ARR_LENGTH * radius + radius;
  const yHour = -Math.cos(hourAngle * Math.PI / 180) * HOUR_ARR_LENGTH * radius + radius;
  secondArrow.setAttribute("y2", `${ySec}`);
  secondArrow.setAttribute("x2", `${xSec}`);
  minuteArrow.setAttribute("y2", `${yMin}`);
  minuteArrow.setAttribute("x2", `${xMin}`);
  hourArrow.setAttribute("y2", `${yHour}`);
  hourArrow.setAttribute("x2", `${xHour}`);
  console.log(date)
}
