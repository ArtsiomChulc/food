/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio = 1.2;
	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, classActive) {
		elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(classActive);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(classActive);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(classActive);
			}
		});
	}

	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	initLocalSettings('#gender div', 'calculating__choose-item_active');



	function getTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '----  ';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}
	getTotal();

	function getStaticInfo(parentSelector, classActive) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(el => {
					el.classList.remove(classActive);
				});
				e.target.classList.add(classActive);
				getTotal();
			});
		});
	}

	getStaticInfo('#gender', 'calculating__choose-item_active');
	getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

	function getDynamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '2px solid red';
			} else {
				input.style.border = 'none';
			}


			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			getTotal();
		});
	}

	getDynamicInfo('#height');
	getDynamicInfo('#weight');
	getDynamicInfo('#age');

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
	class MenuCard {
		constructor(src, alt, title, desc, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.desc = desc;
			this.price = price;
			this.classes = classes;
			this.transfer = 2.7;
			this.parent = document.querySelector(parentSelector);
			this.changeBYN();
		}
		changeBYN() {
			this.price = (this.price * this.transfer).toFixed(1);
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.e = 'menu__item';
				element.classList.add(this.e);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}


			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.desc}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms() {
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner2.svg',
		succes: 'Спасибо, мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 40px auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// const obj = {};
			// formData.forEach(function (value, key) {
			// 	obj[key] = value;
			// });

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.succes);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		showModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
	const modal = document.querySelector('.modal'),
		btnModal = document.querySelectorAll('[data-modal]');


	function showModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearTimeout(timerModal);
	}
	const timerModal = setTimeout(showModal, 50000);


	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	btnModal.forEach(btn => {
		btn.addEventListener('click', showModal);
	});

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.remove('show')) {
			closeModal();
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
	const prevBtn = document.querySelector('.offer__slider-prev'),
		nextBtn = document.querySelector('.offer__slider-next'),
		current = document.querySelector('#current'),
		total = document.querySelector('#total'),
		slider = document.querySelector('.offer__slider'),
		slides = document.querySelectorAll('.offer__slide'),
		innerSlide = document.querySelector('.offer__slider-inner'),
		wrapperSlides = document.querySelector('.offer__slider-wrapper'),
		width = window.getComputedStyle(wrapperSlides).width;

	let offset = 0;
	let slideIndex = 1;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	innerSlide.style.width = 100 * slides.length + '%';
	innerSlide.style.display = 'flex';
	innerSlide.style.transition = '0.5s all';
	wrapperSlides.style.overflow = 'hidden';

	slides.forEach(slide => slide.style.width = width);
	//добавляем индикаторы к слайдеру
	const indicator = document.createElement('ol');
	const dots = [];
	slider.append(indicator);
	indicator.classList.add('carousel-indicators');

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicator.append(dot);

		dots.push(dot);
	}

	function deleteNotDigit(string) {
		return +string.replace(/\D/g, '');  //!используем регулярное выражение /\D/g, '' -значит, что D-не числа мы заменяем '' ничем глобально
	}

	function getDotStyle() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	function addNullForCurrent() {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	nextBtn.addEventListener('click', () => {
		if (offset == deleteNotDigit(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset = offset + deleteNotDigit(width);
		}

		innerSlide.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		addNullForCurrent();

		getDotStyle();

	});
	prevBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigit(width) * (slides.length - 1);
		} else {
			offset = offset - deleteNotDigit(width);
		}

		innerSlide.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		addNullForCurrent();

		getDotStyle();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;
			offset = deleteNotDigit(width) * (slideTo - 1);

			innerSlide.style.transform = `translateX(-${offset}px)`;

			addNullForCurrent();
			getDotStyle();
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabsContent() {
		tabsContent.forEach(item => {		//перебираем псевдомассив(контент табов), добавляем/удаляем элементу классы
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');   //то же, но в табах
		});
	}

	function showTabsContent(i = 0) {           //по умолчанию первый элемент псевдомассива показан
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');   //! Связано с делегированием ниже
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabsContent();

	tabsParent.addEventListener('click', (event) => {				   //делаем слушателем события родителя табов
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {  //проверяем на наличие класса
			tabs.forEach((item, i) => {                                //!перебираем отдельные элементы и индекс
				if (target == item) {								   // если мы кликнули на нужный нам элемент
					hideTabsContent();
					showTabsContent(i);                                //! Этот индекс передаем в функцию в качестве аргумента  
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
	let deadLine = '2023-01-30';

	function getTimeRemain(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		let days, hours, minutes, seconds;
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor(t / (1000 * 60 * 60) % 24);
			minutes = Math.floor((t / 1000 / 60) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			'total': t,
			'd': days,
			'h': hours,
			'm': minutes,
			's': seconds
		};
	}
	function setTime(selector, endtime) {
		const wrapper = document.querySelector(selector);
		const days = wrapper.querySelector('#days');
		const hours = wrapper.querySelector('#hours');
		const minutes = wrapper.querySelector('#minutes');
		const seconds = wrapper.querySelector('#seconds');
		const timeInterval = setInterval(updateTime, 1000);

		updateTime();
		function getZero(n) {
			if (n >= 0 && n < 10) {
				return `0${n}`;
			} else {
				return n;
			}
		}

		function updateTime() {
			const call = getTimeRemain(endtime);

			days.innerHTML = getZero(call.d);
			hours.innerHTML = getZero(call.h);
			minutes.innerHTML = getZero(call.m);
			seconds.innerHTML = getZero(call.s);

			if (call.total <= 0) {
				clearInterval(timeInterval);
			}
		}

	}


	setTime('.timer', deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_calc__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {


	const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map