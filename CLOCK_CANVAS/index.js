const inputField = document.getElementById('inputField');
const diameterElem = document.getElementById('diameter');
const btn = document.getElementById('btn');

const MIN_DIAMETR = 200;
const MAX_DIAMETR = 800;
const HOUR_CIRCLE_SIZE = 0.14;
const SEC_ARR_LENGTH = 0.8;
const SEC_ARR_WIDTH = 0.01;
const MIN_ARR_LENGTH = 0.6;
const MIN_ARR_WIDTH = 0.035;
const HOUR_ARR_LENGTH = 0.4;
const HOUR_ARR_WIDTH = 0.07;
const FONT_SIZE = 0.12;

btn.addEventListener('onclick', build);

function build() {
  inputField.innerHTML = '';
  const diametr = Number(diameterElem.value);
  const radius = diametr / 2;
  if (isNaN(diametr) || diametr < MIN_DIAMETR || diametr > MAX_DIAMETR) {
    alert(`Диаметр должен быть в пределах ${MIN_DIAMETR} и ${MAX_DIAMETR}`);
    return;
  }
  createClock(radius);
  setInterval(() => { createClock(radius) }, 1000)
}

function createClock(radius) {
  let canvas=null;
  let context=null;
  const smallDiametr = radius * 2 * HOUR_CIRCLE_SIZE;
  canvas = document.getElementById('CVS1');
  context = canvas.getContext('2d');
  canvas.classList.remove('hidden');
  context.beginPath();
  context.arc(radius, radius, radius, 0, Math.PI * 2, false);
  context.fillStyle = 'rgb(155, 207, 244)';
  context.fill();
  for (let i = 0; i < 12; i++) {
    const angle = i * (360 / 12); // угол поворота
    const x = radius + radius * SEC_ARR_LENGTH * Math.sin(angle * Math.PI / 180); // вычисляем координату x
    const y = radius - radius * SEC_ARR_LENGTH * Math.cos(angle * Math.PI / 180);// вычисляем координату y
    context.beginPath();
    context.arc(x, y, smallDiametr / 2, 0, Math.PI * 2, false);
    context.fillStyle = 'rgb(211, 99, 178)';
    context.fill();
    context.fillStyle = 'white'
    context.font = `bold ${FONT_SIZE * radius}px Arial`;
    context.textAlign = 'center'; // горизонтальное выравнивание
    context.textBaseline = 'middle'; // вертикальное выравнивание
    context.fillText(`${i === 0 ? 12 : i}`, x, y);
  }
  const date = new Date();
  //создаем время
  context.fillStyle = 'white'
  context.font = `bold ${FONT_SIZE * radius}px Arial`;
  context.fillText(`${date.toLocaleTimeString()}`, radius, radius / 2);
  context.textAlign = 'center'; // горизонтальное выравнивание

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

  // рисуем стрелки
  const secWidth = radius * SEC_ARR_WIDTH;
  const minWidth = radius * MIN_ARR_WIDTH;
  const hourWidth = radius * HOUR_ARR_WIDTH;
  drawArrow(context, radius, secWidth, xSec , ySec);
  drawArrow(context, radius, minWidth, xMin , yMin);
  drawArrow(context, radius, hourWidth, xHour , yHour);

  console.log(date)
}

function drawArrow(context, radius, width, x , y) {
  context.strokeStyle = 'rgb(46, 15, 100)';
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(radius, radius);
  context.lineTo(x, y);
  context.stroke();
}
