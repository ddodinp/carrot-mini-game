'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();

const game = new Game(3, 2, 10);
game.setGameStopListener(reason => {
    console.log(reason);
    let message;
    switch(reason) {
        case 'cancel':
            message =  'Replay?'
            break;
        case 'win':
            message =  'You won!'
            break;
        case 'lose':
            message =  'You lost'
            break;
        default:
            throw new Error('not valid reason')
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});