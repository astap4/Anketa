export default class ClockViewDom {
    constructor() {
        this.model = null;
        this.field = null;
        this.clock = null;
        this.secondArrow = null;
        this.minuteArrow = null;
        this.hourArrow = null;
        this.time = null;
    }

    start(model, field) {
        this.model = model;
        this.field = field;
    }

    build() {
        this.clock = document.createElement('div');
        this.clock.classList.add('clock');
        this.field.append(this.clock);
        this.secondArrow = document.createElement('div');
        this.secondArrow.classList.add('secondArrow');
        this.minuteArrow = document.createElement('div');
        this.minuteArrow.classList.add('minuteArrow');
        this.hourArrow = document.createElement('div');
        this.hourArrow.classList.add('hourArrow');
        this.time = document.createElement('span');
        this.time.classList.add('time');
        this.clock.append(this.secondArrow, this.minuteArrow, this.hourArrow, this.time);
        const diameter = this.model.width;
        const xCenter = diameter / 2 - diameter / 15// центрирование малого круга по горизонтали
        const yCenter = diameter / 2 - diameter / 15// центрирование малого круга по вертикали
        for (let i = 0; i < 12; i++) {
            const hourCell = document.createElement('div');
            hourCell.textContent = (i === 0) ? 12 : i;// заменяем 0 на 12
            hourCell.classList.add('hour');
            const angle = i * (360 / 12); // угол поворота
            const x = xCenter + xCenter * Math.sin(angle * Math.PI / 180); // вычисляем координату x
            const y = yCenter - yCenter * Math.cos(angle * Math.PI / 180);// вычисляем координату y
            hourCell.style.left = x + 'px';
            hourCell.style.top = y + 'px';
            this.clock.append(hourCell);
        }
    }

    updateArrows(timeLocal, secAngle, minAngle, hourAngle) {
        this.time.textContent = timeLocal;
        this.secondArrow.style.transform = `rotate(${secAngle}deg)`;
        this.minuteArrow.style.transform = `rotate(${minAngle}deg)`;
        this.hourArrow.style.transform = `rotate(${hourAngle}deg)`;
    }
}