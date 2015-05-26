var validation = true;

//-------------------------------------------------------------------
window.addEventListener('load', function(){
	var phone = document.getElementById('phone').onchange = function() {
		var text = phone.value;
		if(text.length <= 0)
			validation = false;
	}

	var count = document.getElementById('count').onchange = function() {
		var totalPrice = document.querySelector('.total-price');
		var currentPrice = 0;
		if(totalPrice != null) {
			totalPrice.textContent = 'Сумма заказа составляет ' + currentPrice + ' руб.';
			//Нужно взять переменную с тотал сум  и потом перемножить
		}
	}

	var confirmBtn = document.querySelector('.confirm-button').addEventListener('click', function() {
		//ToDo: дописать получение нмоера и количества.
	});
});