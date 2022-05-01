'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }

    init() {
        this.field.innerHTML = ''; // 필드 초기화해서 이미지들이 누적되지 않게 방지
        // 벌레와 당근을 생성한 뒤 field에 추가해줌
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2); //랜덤 숫자의 범위
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
    
    onClick(event) {
        const target = event.target;
        if(target.matches('.carrot')) {
            //당근!!
            target.remove();
            sound.playCarrot();
            this.onClick && this.onItemClick('carrot');
        } else if(target.matches('.bug')) {
            // 벌레!!
            this.onClick && this.onItemClick('bug');
        }
    }
}


//클래스와 관계없는, 밖에 있기 때문에 this 슬 필요 x
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


