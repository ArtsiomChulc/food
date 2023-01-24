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

export default timer;