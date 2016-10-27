var navMain = document.querySelector('.nav');
var navToggle = document.querySelector('.menu__btn');

navMain.classList.remove('menu__nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('menu__nav--opened')) {
    navMain.classList.remove('menu__nav--opened');
    navMain.classList.add('menu__nav--closed');
  } else {
    navMain.classList.add('menu__nav--opened');
    navMain.classList.remove('menu__nav--closed');
  }
});
