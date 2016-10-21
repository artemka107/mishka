var burger = document.querySelector('.burger');

burger.addEventListener('click', function() {
  if (burger.classList.contains('burger--closed')) {
    burger.classList.remove('burger--closed');
  } else {
    burger.classList.add('burger--closed');
  }
});
