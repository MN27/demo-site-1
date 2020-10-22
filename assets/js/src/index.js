import '@babel/polyfill';
import { backToTop } from './back_to_top';
import { slickSetting } from './slick_setting';
import { smoothScroll } from './smooth_scroll';
import { removeBodyOverflow, headerBackground } from './menu';

window.addEventListener('load', () =>  {
  smoothScroll();
  slickSetting();
});

window.addEventListener('scroll', () => {
  headerBackground();
  backToTop();
});

window.addEventListener('resize', () => {
  removeBodyOverflow();
});
