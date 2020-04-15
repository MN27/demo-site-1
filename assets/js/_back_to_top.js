'use strict';

// const fadeIn = (element, speed) => {
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

const backToTop = document.getElementById('back_to_top');
const bttInterval = 5;
let scrollTimer;

window.addEventListener('scroll', () => {
  if (scrollTimer !== false) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = setTimeout(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const y = window.scrollY;
    if (width < 1024) {
      // backToTop.style.display = 'none';
      backToTop.classList.remove('active');
      return;
    }
    if (y < 150) {
      backToTop.classList.remove('active');
      return;
    }
    if ((docHeight - 300) < (y + height)) {
      backToTop.classList.remove('active');
      return;
    }
    if (1024 <= width) {
      backToTop.classList.add('active');
      return;
    }
  }, bttInterval);
});