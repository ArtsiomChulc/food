function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function showModal(modalSelector, timerModal) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	clearTimeout(timerModal);

	console.log(timerModal);
	if (timerModal) {
		clearInterval(timerModal);
	}
}

function modal(triggerSelector, modalSelector, timerModal) {
	const modal = document.querySelector(modalSelector),
		btnModal = document.querySelectorAll(triggerSelector);




	btnModal.forEach(btn => {
		btn.addEventListener('click', () => showModal(modalSelector, timerModal));
	});

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.remove('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showModal(modalSelector, timerModal);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { showModal };
export { closeModal };