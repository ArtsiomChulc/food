import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';


window.addEventListener('DOMContentLoaded', () => {


	const calc = require('./modules/calc');

	tabs();
	slider();
	modal();
	timer();
	forms();
	cards();
	calc();




	// !---===TABS---===---===---===


	//!!!------------MODAL-------------------///////---------///////

	//!----===---==---===TIMER---===---===---===---===///


	//!---===---===---===MENU-CARD---===---===---===///


	//!---===---FORMS---===--==



	// !SLIDER with displayBlock/none
	//находим элементы
	// const prevBtn = document.querySelector('.offer__slider-prev'),
	// 	nextBtn = document.querySelector('.offer__slider-next'),
	// 	current = document.querySelector('#current'),
	// 	total = document.querySelector('#total'),
	// 	slides = document.querySelectorAll('.offer__slide');

	// let slideIndex = 1; //для показа номера слайда

	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	slides.forEach(item => item.style.display = 'none');
	// 	slides[slideIndex - 1].style.display = 'block';

	// if (slides.length < 10) {
	// 	current.textContent = `0${slideIndex}`;
	// } else {
	// 	current.textContent = slideIndex;
	// }

	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex = slideIndex + n);
	// }

	// prevBtn.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });
	// nextBtn.addEventListener('click', () => {
	// 	plusSlides(1);
	// });




	// !SLIDER with element.width



	//!Calculator


});