var navMain = document.querySelector('.top-menu__nav');
var navToggle = document.querySelector('.top-menu__btn');

navMain.classList.remove('top-menu__nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('top-menu__nav--opened')) {
    navMain.classList.remove('top-menu__nav--opened');
    navMain.classList.add('top-menu__nav--closed');
  } else {
    navMain.classList.add('top-menu__nav--opened');
    navMain.classList.remove('top-menu__nav--closed');
  }
});
