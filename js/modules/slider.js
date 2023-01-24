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

export default slider;