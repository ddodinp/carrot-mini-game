'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT = 20;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if(!started) {
        return;
    }
    if(item === 'carrot') {
        //당근!!
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if(item === 'bug') {
        // 벌레!!
        finishGame(false);
    }
}

gameBtn.addEventListener('click', () => {
    console.log('log');
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    sound.playBg()
};

function stopGame() {
    started = false;
    stopGameTimer();
    hideStartBtn();
    gameFinishBanner.showWithText('REPLAY?');
    sound.playAlert()
    sound.stopBg();
};

function finishGame(win) {
    started = false;
    hideStartBtn();
    if(win) {
        sound.playWin()
    } else {
        sound.playBug();
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win? 'YOU WON' : 'YOU LOSE');
}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideStartBtn() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=> {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        } 
        updateTimerText(--remainingTimeSec); // 1씩 줄어들기(++의 반대)
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer)
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60); //소수점이면 내려줌
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
    
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score; //남은 당근의 수
}