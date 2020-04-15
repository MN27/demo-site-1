'use strict';

//スムーススクロール
$('a[href^="#"]').click(function(){
  //.no_scrollクラスを持つa要素はスクロールしない
  if ($(this).hasClass('no_scroll')) {
    return;
  }
  const speed = 500;
  const href= $(this).attr('href');
  const target = $(href == '#' || href == "" ? 'html' : href);
  const position = target.offset().top;
  $('html, body').animate({scrollTop:position}, speed, 'swing');
  return false;
});