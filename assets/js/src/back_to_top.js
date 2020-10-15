const bttButton = $('#back_to_top');
let scrollTimer;

export const backToTop = () => {
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = setTimeout(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const yPosition = window.scrollY || window.pageYOffset;
    if (width < 1024) {
      bttButton.removeClass('active');
      return;
    }
    if (yPosition < 150) {
      bttButton.removeClass('active');
      return;
    }
    if (docHeight - 300 < yPosition + height) {
      bttButton.removeClass('active');
      return;
    }
    if (1024 <= width) {
      bttButton.addClass('active');
      return;
    }
  }, 200);
};
