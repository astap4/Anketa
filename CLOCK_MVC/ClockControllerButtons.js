export default class ClockControllerButtons {
    constructor() {
        this.model = null;
        this.field = null;
        this.clock = null;
        this.btnStart = null;
        this.btnStop = null;
    }

    start(model, field, btnStart, btnStop) {
        this.model = model;
        this.field = field;
        this.btnStart = btnStart;
        this.btnStop = btnStop;

        // назначаем обработчики событий
        this.btnStart.addEventListener('click', this.startClock.bind(this));
        this.btnStop.addEventListener('click', this.stopClock.bind(this));
    }

    startClock() {
        if (this.model) {
            const timeZone = this.model.getTimeZone();
            this.model.startClock(timeZone);
        }
    }

    stopClock() {
        if (this.model) {
            this.model.stopClock();
        }
    }
}