const menuBtn = document.querySelector(".menu_btn"),
nav = document.querySelector(".nav");

menuBtn.addEventListener('click', function() {
	nav.classList.toggle('active');
});