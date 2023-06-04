export default class ClockViewSvg {
    constructor() {
        this.model = null;
        this.field = null;
        this.clock = null;
        this.secondArrow = null;
        this.minuteArrow = null;
        this.hourArrow = null;
        this.time = null;
        this.HOUR_CIRCLE_SIZE = 0.14;
        this.SEC_ARR_LENGTH = 0.7;
        this.SEC_ARR_WIDTH = 0.02;
        this.MIN_ARR_LENGTH = 0.6;
        this.MIN_ARR_WIDTH = 0.035;
        this.HOUR_ARR_LENGTH = 0.4;
        this.HOUR_ARR_WIDTH = 0.07;
    }

    start(model, field) {
        this.model = model;
        this.field = field;
    }

    build() {
        const diameter = this.model.width;
        const radius = diameter /2;
        this.clock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.clock.setAttribute("id", "clock");
        this.clock.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.clock.setAttribute('width', `${diameter}`);
        this.clock.setAttribute('height', `${diameter}`);
        this.clock.classList.add('clock');
        this.field.append(this.clock);
        const circleElement= document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleElement.setAttribute("id", "clockCircle");
        circleElement.setAttribute('r', `${radius}`);
        circleElement.setAttribute('cx', `${radius}`);
        circleElement.setAttribute('cy', `${radius}`);
        const smallDiametr = diameter * this.HOUR_CIRCLE_SIZE;

        for (let i = 0; i < 12; i++) {
            const hourCell = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            hourCell.classList.add('hourSvg');
            hourCell.setAttribute('r', `${smallDiametr / 2}`);
            const angle = i * (360 / 12); // угол поворота
            const x = radius + radius * 0.85 * Math.sin(angle * Math.PI / 180); // вычисляем координату x
            const y = radius - radius * 0.85 * Math.cos(angle * Math.PI / 180);// вычисляем координату y
            hourCell.setAttribute('cx', `${x}`);
            hourCell.setAttribute('cy', `${y}`);
            const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text"); // создаем элемент текста
            textElement.setAttribute("x", `${x}`); // устанавливаем позицию текста по оси x
            textElement.setAttribute("y", `${y}`); // устанавливаем позицию текста по оси y
            textElement.textContent = (i === 0) ? 12 : i;// заменяем 0 на 12
            this.clock.append(hourCell);
            this.clock.append(textElement);
        }
        //создаем время
        this.time = document.createElementNS("http://www.w3.org/2000/svg", "text"); // создаем элемент текста
        this.time.setAttribute("x", `${radius}`); // устанавливаем позицию текста по оси x
        this.time.setAttribute("y", `${radius * this.MIN_ARR_LENGTH}`); // устанавливаем позицию текста по оси y
        this.time.classList.add('time')
        this.clock.append(this.time);
        // создаем стрелки
        this.secondArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.minuteArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.hourArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.secondArrow.setAttribute('stroke-width', `${radius * this.SEC_ARR_WIDTH}`);
        this.secondArrow.setAttribute("x1", `${radius}`);
        this.secondArrow.setAttribute("y1", `${radius}`);
        this.secondArrow.setAttribute("x2", `${radius}`);
        this.secondArrow.setAttribute("y2", `${this.SEC_ARR_LENGTH * radius}`);
        this.minuteArrow.setAttribute('stroke-width', `${radius * this.MIN_ARR_WIDTH}`);
        this.minuteArrow.setAttribute("x1", `${radius}`);
        this.minuteArrow.setAttribute("y1", `${radius}`);
        this.minuteArrow.setAttribute("x2", `${radius}`);
        this.minuteArrow.setAttribute("y2", `${this.MIN_ARR_LENGTH * radius}`);
        this.hourArrow.setAttribute('stroke-width', `${radius * this.HOUR_ARR_WIDTH}`);
        this.hourArrow.setAttribute("x1", `${radius}`);
        this.hourArrow.setAttribute("y1", `${radius}`);
        this.hourArrow.setAttribute("x2", `${radius}`);
        this.hourArrow.setAttribute("y2", `${this.HOUR_ARR_LENGTH * radius}`);
        this.clock.append(this.secondArrow, this.minuteArrow, this.hourArrow);
    }

    updateArrows(timeLocal, secAngle, minAngle, hourAngle) {
        this.time.textContent = timeLocal;
        const radius = this.model.width / 2;
        const xSec = Math.sin(secAngle * Math.PI / 180) * this.SEC_ARR_LENGTH * radius + radius;
        const ySec = -Math.cos(secAngle * Math.PI / 180) * this.SEC_ARR_LENGTH * radius + radius;
        const xMin = Math.sin(minAngle * Math.PI / 180) * this.MIN_ARR_LENGTH * radius + radius;
        const yMin = -Math.cos(minAngle * Math.PI / 180) * this.MIN_ARR_LENGTH * radius + radius;
        const xHour = Math.sin(hourAngle * Math.PI / 180) * this.HOUR_ARR_LENGTH * radius + radius;
        const yHour = -Math.cos(hourAngle * Math.PI / 180) * this.HOUR_ARR_LENGTH * radius + radius;
        this.secondArrow.setAttribute("y2", `${ySec}`);
        this.secondArrow.setAttribute("x2", `${xSec}`);
        this.minuteArrow.setAttribute("y2", `${yMin}`);
        this.minuteArrow.setAttribute("x2", `${xMin}`);
        this.hourArrow.setAttribute("y2", `${yHour}`);
        this.hourArrow.setAttribute("x2", `${xHour}`);
    }
}