'use strict'; // const fadeIn = (element, speed) => {
//   if (element.style.display === 'block') {
//     return;
//   }
//   element.style.display = 'block';
//   element.animate([{
//     opacity: 0
//   }, {
//     opacity: 0.8
//   }], speed);
// };
// const fadeOut = (element, speed) => {
//   if (element.style.display === 'none') {
//     return;
//   }
//   element.animate([{
//     opacity: 0.8
//   }, {
//     opacity: 0
//   }], speed);
//   setTimeout(() => {
//     element.style.display = 'none';
//   }, speed - 50);
// };

var backToTop = document.getElementById('back_to_top');
var bttInterval = 5;
var scrollTimer;
window.addEventListener('scroll', function () {
  if (scrollTimer !== false) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = setTimeout(function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;
    var y = window.scrollY;

    if (width < 1024) {
      // backToTop.style.display = 'none';
      backToTop.classList.remove('active');
      return;
    }

    if (y < 150) {
      backToTop.classList.remove('active');
      return;
    }

    if (docHeight - 300 < y + height) {
      backToTop.classList.remove('active');
      return;
    }

    if (1024 <= width) {
      backToTop.classList.add('active');
      return;
    }
  }, bttInterval);
});
'use strict';

var slideAnimation = function slideAnimation(element, speed) {
  var heightValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';
  var copyBox = element.cloneNode(true);
  element.parentNode.appendChild(copyBox);
  copyBox.style.cssText = "display:block; height: ".concat(heightValue, "; visibility:hidden; ");
  var copyBoxH = copyBox.offsetHeight;
  element.parentNode.removeChild(copyBox);
  var elH = element.offsetHeight;

  if (elH < 1) {
    element.style.display = 'block';
    slideDown(element, elH, copyBoxH, speed);
  } else {
    slideUp(element, elH, speed);
  }
}; // スライドダウンのアニメーション


var slideDown_timer = 0;

var slideDown = function slideDown(element, elH, copyBoxH, speed) {
  if (elH < copyBoxH) {
    elH = elH + speed;
    element.style.height = "".concat(elH, "px");
    slideDown_timer = setTimeout(function () {
      slideDown(element, elH, copyBoxH, speed);
    }, 5);
  } else {
    clearTimeout(slideDown_timer);
    slideDown_timer = 0;
    element.style.height = "".concat(copyBoxH, "px");
  }
}; // スライドアップのアニメーション


var slideUp_timer = 0;

var slideUp = function slideUp(element, elH, speed) {
  if (elH >= 1) {
    elH = elH - speed;
    element.style.height = "".concat(elH, "px");
    slideUp_timer = setTimeout(function () {
      slideUp(element, elH, speed);
    }, 5);
  } else {
    clearTimeout(slideUp_timer);
    slideUp_timer = 0;
    element.style.height = 0;
    element.style.display = 'none';
  }
}; // ヘッダー部分背景の表示


var headerContainer = document.getElementById('header_container_bg');
var menuTrigger = document.getElementsByClassName('menu_trigger')[0];
window.addEventListener('scroll', function () {
  var y = window.scrollY;

  if (50 < y) {
    headerContainer.classList.add('active');
  }

  if (y < 50 && !menuTrigger.classList.contains('active')) {
    headerContainer.classList.remove('active');
  }
}); // メニューの表示切替 + メニュー表示中にbodyのスクロールをさせない

var navSp = document.querySelector('nav .sp');
menuTrigger.addEventListener('click', function (event) {
  event.preventDefault();
  menuTrigger.classList.toggle('active');
  slideAnimation(navSp, 30, '100vh');
  var body = document.body;

  if (menuTrigger.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}, false); // スマホ用childメニューの表示切替

var spMenu = Array.from(document.querySelectorAll('nav .sp .parent'));
spMenu.forEach(function (element) {
  element.addEventListener('click', function (event) {
    element.classList.toggle('active');
    var child = element.getElementsByTagName('ul')[0];
    slideAnimation(child, 5);
    event.preventDefault();
  }, false);
}); // PC用childメニューの表示切替

var pcMenu = Array.from(document.querySelectorAll('nav .pc .parent'));
pcMenu.forEach(function (element) {
  var child = element.getElementsByTagName('ul')[0];
  element.addEventListener('mouseover', function () {
    // 前回のアニメーションの終了を確認する
    if (slideDown_timer !== 0) {
      return;
    }

    if (child.style.display === '' || child.style.display === 'none') {
      slideAnimation(child, 5);
    }
  }, false);
  element.addEventListener('mouseleave', function () {
    // 前回のアニメーションの終了を確認する
    if (slideUp_timer !== 0) {
      return;
    }

    if (child.style.display === 'block') {
      slideAnimation(child, 5);
    }
  }, false);
}); // メニューを開いたまま画面サイズを変更した場合の処理

var resizeTimer;
var resizeInterval = 300;
window.addEventListener('resize', function () {
  // 定義されたsetTimeoutを消去する
  if (resizeTimer !== false) {
    clearTimeout(resizeTimer);
  } // setTimeoutを使用して判定回数を減らす


  resizeTimer = setTimeout(function () {
    document.body.style.overflow = '';
  }, resizeInterval);
});
'use strict';

$('.slider').slick({
  centerMode: false,
  centerPadding: '50px',
  slidesToShow: 3,
  infinite: false,
  dots: true,
  lazyLoad: 'progressive',
  responsive: [{
    breakpoint: 800,
    settings: {
      arrows: false,
      centerMode: false,
      centerPadding: '50px',
      slidesToShow: 2
    }
  }, {
    breakpoint: 480,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '50px',
      slidesToShow: 1
    }
  }]
});
'use strict'; //スムーススクロール

$('a[href^="#"]').click(function () {
  //.no_scrollクラスを持つa要素はスクロールしない
  if ($(this).hasClass('no_scroll')) {
    return;
  }

  var speed = 500;
  var href = $(this).attr('href');
  var target = $(href == '#' || href == "" ? 'html' : href);
  var position = target.offset().top;
  $('html, body').animate({
    scrollTop: position
  }, speed, 'swing');
  return false;
});