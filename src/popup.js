'use strict';
// export default 를 하면 외부로 노출시켜 이파일뿐만 아니라 외부에서도 이 파일을 볼 수 있다.
export default class PopUp {
    construnctor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }
    
    // class 자체가 PopUp이기 때문에 showPopUpWithText에서 PopUp 생략하고 선언 가능.
    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    
    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}


