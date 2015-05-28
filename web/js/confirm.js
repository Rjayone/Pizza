var validation = true;

//-------------------------------------------------------------------
window.addEventListener('load', function(){
	var phone = document.getElementById('phone').onchange = function() {
		var text = document.getElementById('phone').value;
		if(text.length <= 0)
			validation = false;
	}

	var count = document.getElementById('count').onchange = function(count) {
		var totalPrice = document.querySelector('.total-price');
		var totalPriceValue = totalPrice.getAttribute('value');
		if(totalPrice != null) {
			totalPrice.textContent = 'Сумма заказа составляет ' + totalPriceValue * count.target.value + ' руб.';
		}
	};

	var confirmBtn = document.getElementById('confirm-button').addEventListener('click', function() {
		var count = $('#count');
		var phone = $('#phone');

		if(validation == false) {
			alert('Поля заполнены не коректно');
			return;
		}

		var form = $('#confirm');
		count.val(count.value);
		phone.val(phone.value);
		form.submit();
	});
});