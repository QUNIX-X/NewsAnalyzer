window.addEventListener('DOMContentLoaded', function() {
  let swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 8,
    grabCursor: true,
    slidesPerGroup: 1,
    slideToClickedSlide: true,
    centeredSlides: true,
    centeredSlidesBounds: false,
    preventClicks: true,
    preventClicksPropagation: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      450: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 16,
      }
    }
  });
});


