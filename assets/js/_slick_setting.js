'use strict';

$('.slider').slick({
  centerMode: false,
  centerPadding: '50px',
  slidesToShow: 3,
  infinite: false,
  dots: true,
  lazyLoad: 'progressive',
  responsive: [
    {
      breakpoint: 800,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '50px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '50px',
        slidesToShow: 1
      }
    }
  ]
});