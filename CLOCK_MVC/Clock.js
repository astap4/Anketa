export default class ClockModel {
    constructor() {
        this.width = 300;
        this.view = null;
        this.intervalId = null;
        this.timeZone = null;
    }

    start(view) {
        this.view = view;
    }

    updateView() {
        if (this.view)
            this.view.build();
    }

    getTimeZone() {
        return this.timeZone
    }

    getTime() {
        const timeZones = {
            "Нью-Йорк (GMT-5)": "America/New_York",
            "Лондон (GMT)": "Europe/London",
            "Берлин (GMT+1)": "Europe/Berlin",
            "Минск (GMT+3)": "Europe/Minsk",
            "Токио (GMT+9)": "Asia/Tokyo",
            "Владивосток (GMT+10)": "Asia/Vladivostok",
          };
        const timeZone = timeZones[this.timeZone]
        const currentTime = new Date();
        const time = currentTime.toLocaleTimeString("en-US", { timeZone });
        const parsedTime = new Date("2000-01-01 " + time);
        const hours = parsedTime.getHours();
        const minutes = parsedTime.getMinutes();
        const seconds = parsedTime.getSeconds();
        const secAngle = 360 / 60 * seconds;
        const minAngle = 360 / 60 * minutes;
        const hourAngle = 360 / 12 * (hours + minutes / 60);
        this.view.updateArrows(time, secAngle, minAngle, hourAngle);
    }

    startClock(timeZone) {
        // модель при любых изменениях
        // вызывает обновление представления
        console.log(timeZone)
        this.timeZone = timeZone
        this.getTime();
        this.intervalId = setInterval(() => {
            this.getTime();
        }, 1000);

    }

    stopClock() {
        clearInterval(this.intervalId);
    }
}