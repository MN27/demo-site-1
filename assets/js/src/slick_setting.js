import 'slick-carousel';

export const slickSetting = () => {
  $('.slider').slick({
    centerMode: false,
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
        },
      },
    ],
  });
};
