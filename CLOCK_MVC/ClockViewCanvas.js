export default class ClockViewCanvas {
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
        this.FONT_SIZE = 0.14;
        this.canvas = null;
        this.context = null;
    }

    start(model, field) {
        this.model = model;
        this.field = field;
    }

    build() {
        this.canvas = document.createElement('canvas');
        this.field.append(this.canvas);
    }

    updateArrows(timeLocal, secAngle, minAngle, hourAngle) {
        const radius = (this.model.width + 20) / 2;
        const smallDiametr = radius * 2 * this.HOUR_CIRCLE_SIZE;
        this.canvas.width = this.model.width + 20;
        this.canvas.height = this.model.width + 20;
        this.context = this.canvas.getContext('2d');
        this.context.beginPath();
        this.context.arc(radius, radius, radius, 0, Math.PI * 2, false);
        this.context.fillStyle = 'rgb(94, 237, 135)';
        this.context.fill();
        this.context.beginPath();
        this.context.arc(radius, radius, radius - 10, 0, Math.PI * 2, false);
        this.context.fillStyle = 'rgb(237, 199, 94)';
        this.context.fill();
        
        for (let i = 0; i < 12; i++) {
            const angle = i * (360 / 12); // угол поворота
            const x = radius + (radius - smallDiametr / 2 - 10) * Math.sin(angle * Math.PI / 180); // вычисляем координату x
            const y = radius - (radius - smallDiametr / 2 - 10) * Math.cos(angle * Math.PI / 180); // вычисляем координату y
            this.context.beginPath();
            this.context.arc(x, y, smallDiametr / 2, 0, Math.PI * 2, false);
            this.context.fillStyle = 'rgb(66, 141, 80)';
            this.context.fill();
            this.context.fillStyle = 'white'
            this.context.font = `normal ${this.FONT_SIZE * radius}px Times New Roman`;
            this.context.textAlign = 'center'; // горизонтальное выравнивание
            this.context.textBaseline = 'middle'; // вертикальное выравнивание
            this.context.fillText(`${i === 0 ? 12 : i}`, x, y);
        }
        //создаем время
        this.context.fillStyle = 'black'
        this.context.font = `normal ${this.FONT_SIZE * radius}px Times New Roman`;
        this.context.fillText(`${timeLocal}`, radius, radius/1.5);
        this.context.textAlign = 'center'; // горизонтальное выравнивание
        const xSec = Math.sin(secAngle * Math.PI / 180) * this.SEC_ARR_LENGTH * radius + radius;
        const ySec = -Math.cos(secAngle * Math.PI / 180) * this.SEC_ARR_LENGTH * radius + radius;
        const xMin = Math.sin(minAngle * Math.PI / 180) * this.MIN_ARR_LENGTH * radius + radius;
        const yMin = -Math.cos(minAngle * Math.PI / 180) * this.MIN_ARR_LENGTH * radius + radius;
        const xHour = Math.sin(hourAngle * Math.PI / 180) * this.HOUR_ARR_LENGTH * radius + radius;
        const yHour = -Math.cos(hourAngle * Math.PI / 180) * this.HOUR_ARR_LENGTH * radius + radius;
        // рисуем стрелки
        const secWidth = radius * this.SEC_ARR_WIDTH;
        const minWidth = radius * this.MIN_ARR_WIDTH;
        const hourWidth = radius * this.HOUR_ARR_WIDTH;
        this.drawArrow(this.context, radius, secWidth, xSec, ySec);
        this.drawArrow(this.context, radius, minWidth, xMin, yMin);
        this.drawArrow(this.context, radius, hourWidth, xHour, yHour);
    }

    drawArrow(context, radius, width, x, y) {
        context.strokeStyle = 'rgb(46, 43, 41)';
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(radius, radius);
        context.lineTo(x, y);
        context.stroke();
    }
}