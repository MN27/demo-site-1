// スマホ用メニューの表示切替
const menuTrigger = $('.menu_trigger');
const navSp = $('nav .sp');

menuTrigger.on({
  click: event => {
    event.preventDefault();
    $(event.currentTarget).toggleClass('active');
    navSp.css({ height: '100vh' });
    navSp.slideToggle();

    // メニュー表示中にbodyのスクロールをさせない
    const body = document.body;
    if (menuTrigger.hasClass('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  },
});

// childメニュー
const menuChild = '.child_lists';

// スマホ用childメニューの表示切替
$('nav .sp .parent').on({
  click: event => {
    event.preventDefault();
    $(event.currentTarget).toggleClass('active');
    $(event.currentTarget).find(menuChild).slideToggle();
  },
});

// PC用childメニューの表示切替
$('.pc .menu .parent').on({
  mouseenter: event => {
    if ($(event.currentTarget).find(menuChild).is(':animated')) {
      return;
    }
    $(event.currentTarget).find(menuChild).slideDown();
  },
  mouseleave: event => {
    $(event.currentTarget).find(menuChild).slideUp();
  },
});

const headerContainer = $('#header_container_bg');

// ヘッダー部分背景の表示
export const headerBackground = () => {
  // 上から50pxスクロールしたときにメニューの背景を表示
  const yPosition = window.scrollY || window.pageYOffset;
  if (50 < yPosition) {
    headerContainer.addClass('active');
  }
  if (yPosition < 50) {
    headerContainer.removeClass('active');
  }
};

// メニューを開いたまま画面サイズを変更した場合の処理
let resizeTimer;

export const removeBodyOverflow = () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }

  // body要素のoverflowのスタイルを消去する
  // setTimeoutを使用して判定回数を減らす
  resizeTimer = setTimeout(() => {
    document.body.style.overflow = '';
  }, 300);
};
