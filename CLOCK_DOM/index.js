const diameterElem = document.getElementById('diameter')
const btn = document.getElementById('btn')
const MIN_DIAMETR = 200;
const MAX_DIAMETR = 800;

btn.addEventListener('onclick', build);

function build() {
  const diametr = Number(diameterElem.value);
  if (isNaN(diametr) || diametr < MIN_DIAMETR || diametr > MAX_DIAMETR) {
    alert(`Диаметр должен быть в пределах ${MIN_DIAMETR} и ${MAX_DIAMETR}`);
    return;
  }
  document.body.innerHTML = '';
  const smallDiametr = diametr / 7; // отношение большого и малого круга 1:7
  const xCenter = diametr / 2 - smallDiametr / 2 // центрирование малого круга по горизонтали
  const yCenter = diametr / 2 - smallDiametr / 2// центрирование малого круга по вертикали
  const clock = document.createElement('div');
  clock.classList.add('clock');
  clock.style.width = diametr + 'px';
  clock.style.height = diametr + 'px';
  document.body.append(clock);
  for (let i = 0; i < 12; i++) {
    const hourCell = document.createElement('div');
    hourCell.textContent = (i === 0) ? 12 : i;// заменяем 0 на 12
    hourCell.classList.add('hour');
    hourCell.style.width = smallDiametr + 'px';
    hourCell.style.height = smallDiametr + 'px';
    const angle = i * (360 / 12); // угол поворота
    const x = xCenter + xCenter * Math.sin(angle * Math.PI / 180); // вычисляем координату x
    const y = yCenter - yCenter * Math.cos(angle * Math.PI / 180);// вычисляем координату y
    hourCell.style.left = x + 'px';
    hourCell.style.top = y + 'px';
    clock.append(hourCell);
  }
  //создаем стрелки
  const secondArrow = document.createElement('div');
  const minuteArrow = document.createElement('div');
  const hourArrow = document.createElement('div');
  secondArrow.classList.add('secondArrow');
  minuteArrow.classList.add('minuteArrow');
  hourArrow.classList.add('hourArrow');
  clock.append(secondArrow, minuteArrow, hourArrow);
  const time = document.createElement('span');
  time.classList.add('time');
  clock.append(time);
  getTime(time,secondArrow, minuteArrow, hourArrow);
  setInterval(()=>{getTime(time,secondArrow, minuteArrow, hourArrow)},1000)
}

function getTime(time,secondArrow, minuteArrow, hourArrow) {
  const date = new Date();
  time.textContent = date.toLocaleTimeString();
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const secAngle = 360 / 60 * seconds;
  const minAngle = 360 / 60 * minutes;
  const hourAngle = 360 / 12 * (hours + minutes / 60);
  secondArrow.style.transform = `rotate(${secAngle}deg)`;
  minuteArrow.style.transform = `rotate(${minAngle}deg)`;
  hourArrow.style.transform = `rotate(${hourAngle}deg)`;
  console.log(date)
}
