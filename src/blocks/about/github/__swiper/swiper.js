window.addEventListener('DOMContentLoaded', function() {
  let swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 8,
    grabCursor: true,
    centeredSlides: true,
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
      345: {
        slidesPerView: 1.17,
      },
      376: {
        slidesPerView: 1.25,
      },
      450: {
        slidesPerView: 1.35,
      },
      500: {
        slidesPerView: 1.5,
      },
      600: {
        slidesPerView: 1.52,
        spaceBetween: 16,
      },
      700: {
        slidesPerView: 1.77,
      },
      768: {
        slidesPerView: 1.9,
      },
      950: {
        slidesPerView: 2.2,
      },
      1100: {
        slidesPerView: 3,
      }
    }
  });
  setTimeout(function () {
    swiper.update();
   }, 1500);
});


