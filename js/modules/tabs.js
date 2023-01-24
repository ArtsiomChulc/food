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

export default tabs;