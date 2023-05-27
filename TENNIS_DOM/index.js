'use strict';

const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 500;

createField()

function createField() {
  let leftScore = 0;
  let rightScore = 0;
  const btn = document.createElement('button');
  btn.textContent = 'Старт';
  const score = document.createElement('span');
  score.textContent = '0:0';
  const field = document.createElement('div');
  field.classList.add('play-field')
  document.body.append(btn, score, field);
  const rocketLeft = document.createElement('div');
  rocketLeft.classList.add('rocket-left')
  const rocketRight = document.createElement('div');
  rocketRight.classList.add('rocket-right');
  const ball = document.createElement('div');
  ball.classList.add('ball');
  field.append(rocketLeft, rocketRight, ball)

  let ballH = {
    posX: 375,
    posY: 225,
    initSpeed: 5,
    speedX: 5,
    speedY: 5,
    width: 50,
    height: 50,

    update: function () {
      ball.style.left = this.posX + "px";
      ball.style.top = this.posY + "px";
    }
  }
  ballH.update();

  let areaH = {
    width: FIELD_WIDTH,
    height: FIELD_HEIGHT
  }

  let rocketL = {
    width: 20,
    height: 150,
    speedY: 0,
    posY: 150,
    moveUp: false,
    moveDown: false,

    update: function () {
      rocketLeft.style.top = this.posY + "px";
    }
  }
  let rocketR = {
    width: 20,
    height: 150,
    speedY: 0,
    posY: 150,
    moveUp: false,
    moveDown: false,

    update: function () {
      rocketRight.style.top = this.posY + "px";
    }
  }
  let animationFrame;
  function start() {
    if(animationFrame){
      cancelAnimationFrame(animationFrame);
    }
    ballH.posX = 375;
    ballH.posY = 225;
    ballH.speedX = Math.random() > 0.5 ? ballH.initSpeed : -ballH.initSpeed; // Случайное направление по оси X
    ballH.speedY = Math.random() > 0.5 ? ballH.initSpeed : -ballH.initSpeed; // Случайное направление по оси Y
    animationFrame = requestAnimationFrame(tick);
  }

  function tick() {
    ballH.posX += ballH.speedX;
    // вылетел ли мяч правее стены?
    if (ballH.posX + ballH.width > areaH.width) {
      ballH.speedX = 0;
      ballH.speedY = 0;
      ballH.posX = areaH.width - ballH.width;
      leftScore++;
    }
    // вылетел ли мяч левее стены?
    if (ballH.posX < 0) {
      ballH.speedX = 0;
      ballH.speedY = 0;
      ballH.posX = 0;
      rightScore++;
    }

    score.textContent = `${leftScore}:${rightScore}`;

    // дотронулся ли мяч до левой ракетки?
    if (ballH.posY < rocketL.posY + rocketL.height + ballH.height-1 && ballH.posY >rocketL.posY - ballH.height && ballH.posX === rocketL.width) {
      ballH.speedX = -ballH.speedX;
      ballH.posX = rocketL.width;
    }
    // дотронулся ли мяч до правой ракетки?
    if (ballH.posY < rocketR.posY + rocketR.height + ballH.height-1 && ballH.posY > rocketR.posY - ballH.height && ballH.posX === areaH.width - ballH.width - rocketR.width) {
      ballH.speedX = -ballH.speedX;
      ballH.posX = areaH.width - ballH.width - rocketR.width;
    }

    ballH.posY += ballH.speedY;
    // вылетел ли мяч ниже пола?
    if (ballH.posY + ballH.height > areaH.height) {
      ballH.speedY = -ballH.speedY;
      ballH.posY = areaH.height - ballH.height;
    }
    // вылетел ли мяч выше потолка?
    if (ballH.posY < 0) {
      ballH.speedY = -ballH.speedY;
      ballH.posY = 0;
    }
    ballH.update();

    rocketL.posY += rocketL.speedY;
    rocketR.posY += rocketR.speedY;
    // Проверяем границы левой ракетки
    if (rocketL.posY < 0) {
      rocketL.posY = 0;
    } else if (rocketL.posY + rocketL.height > areaH.height) {
      rocketL.posY = areaH.height - rocketL.height;
    }
    // } else if (rocketL.posY+rocketL.height===ballH.posY && ballH.posX===0) {
    //   rocketL.posY = 0;
    // }

    // Проверяем границы правой ракетки
    if (rocketR.posY < 0) {
      rocketR.posY = 0;
    } else if (rocketR.posY + rocketR.height > areaH.height) {
      rocketR.posY = areaH.height - rocketR.height;
    }

    rocketL.update();
    rocketR.update();

    animationFrame = requestAnimationFrame(tick);
  }

  btn.addEventListener('click', start);

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code === 'ShiftLeft') {
      rocketL.speedY = -5;
    } else if (e.code === 'ControlLeft') {
      rocketL.speedY = 5;
    } else if (e.code === 'ArrowUp') {
      rocketR.speedY = -5;
    } else if (e.code === 'ArrowDown') {
      rocketR.speedY = 5;
    }
  });

  document.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.code === 'ShiftLeft' || e.code === 'ControlLeft') {
      rocketL.speedY = 0;
    } else if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      rocketR.speedY = 0;
    }
  })
}