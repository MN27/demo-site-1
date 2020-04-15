'use strict';

const slideAnimation = (element, speed, heightValue = 'auto') => {
  const copyBox = element.cloneNode(true);
  element.parentNode.appendChild(copyBox);
  copyBox.style.cssText = `display:block; height: ${heightValue}; visibility:hidden; `;
  const copyBoxH = copyBox.offsetHeight;
  element.parentNode.removeChild(copyBox);

  const elH = element.offsetHeight;
  if (elH < 1) {
    element.style.display = 'block';
    slideDown(element, elH, copyBoxH, speed);
  } else {
    slideUp(element, elH, speed);
  }
};

// スライドダウンのアニメーション
let slideDown_timer = 0;
const slideDown = (element, elH, copyBoxH, speed) => {
  if (elH < copyBoxH) {
    elH = elH + speed;
    element.style.height = `${elH}px`;
    slideDown_timer = setTimeout(() => {
      slideDown(element, elH, copyBoxH, speed);
    }, 5);
  } else {
    clearTimeout(slideDown_timer);
    slideDown_timer = 0;
    element.style.height = `${copyBoxH}px`;
  }
};

// スライドアップのアニメーション
let slideUp_timer = 0;
const slideUp = (element, elH, speed) => {
  if (elH >= 1) {
    elH = elH - speed;
    element.style.height = `${elH}px`;
    slideUp_timer = setTimeout(() => {
      slideUp(element, elH, speed);
    }, 5);
  } else {
    clearTimeout(slideUp_timer);
    slideUp_timer = 0;
    element.style.height = 0;
    element.style.display = 'none';
  }
};

// ヘッダー部分背景の表示
const headerContainer = document.getElementById('header_container_bg');
const menuTrigger = document.getElementsByClassName('menu_trigger')[0];

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (50 < y) {
    headerContainer.classList.add('active');
  }
  if (y < 50 && !(menuTrigger.classList.contains('active'))) {
    headerContainer.classList.remove('active');
  }
});

// メニューの表示切替 + メニュー表示中にbodyのスクロールをさせない
const navSp = document.querySelector('nav .sp');
menuTrigger.addEventListener('click', (event) => {
  event.preventDefault();
  menuTrigger.classList.toggle('active');
  slideAnimation(navSp, 30, '100vh');

  const body = document.body;
  if (menuTrigger.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}, false);

// スマホ用childメニューの表示切替
const spMenu = Array.from(document.querySelectorAll('nav .sp .parent'));

spMenu.forEach((element) => {
  element.addEventListener('click', (event) => {
    element.classList.toggle('active');
    const child = element.getElementsByTagName('ul')[0];
    slideAnimation(child, 5);
    event.preventDefault();
  }, false);
});

// PC用childメニューの表示切替
const pcMenu = Array.from(document.querySelectorAll('nav .pc .parent'));

pcMenu.forEach((element) => {
  const child = element.getElementsByTagName('ul')[0];
  element.addEventListener('mouseover', () => {
    // 前回のアニメーションの終了を確認する
    if (slideDown_timer !== 0) {
      return;
    }
    if ( (child.style.display === '') || (child.style.display === 'none')) {
      slideAnimation(child, 5);
    }
  }, false);

  element.addEventListener('mouseleave', () => {
    // 前回のアニメーションの終了を確認する
    if (slideUp_timer !== 0) {
      return;
    }
    if (child.style.display === 'block') {
      slideAnimation(child, 5);
    }
  }, false);
});

// メニューを開いたまま画面サイズを変更した場合の処理
let resizeTimer;
const resizeInterval = 300;

window.addEventListener('resize', () => {
  // 定義されたsetTimeoutを消去する
  if (resizeTimer !== false) {
    clearTimeout(resizeTimer);
  }
  // setTimeoutを使用して判定回数を減らす
  resizeTimer = setTimeout(() => {
    document.body.style.overflow = '';
  }, resizeInterval);
});