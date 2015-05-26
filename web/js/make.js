var components = [], // массив из добавленных компонентов; содержит теги img с компонентами
	workplace, // .workplace
	calculation; // .calculation
var order = [];
var sizeK = 0;
var pizzaSize = 0;
var selectedSize;
var sendOrderData;


//-------------------------------------------------------------------
window.addEventListener('load', function(){
	workplace = document.querySelector('.workplace');
	calculation = document.querySelector('.total-price');
	components = document.querySelectorAll('.component-cell');
	//sendOrder = document.querySelector('.send-order').addEventListener('click', sendOrder());
	for(var i = 0; i < components.length; i++){
		makeAdded(components[i]);
	}
	var sizeButtons = document.getElementsByClassName('size');
	for(var i = 0; i < sizeButtons.length; i++) {
		makeResizeable(sizeButtons[i], i);
	}
	recalculate();
	sendOrderData = document.querySelector('.send-order');
	sendOrderData.addEventListener('click', function() {
		sendOrder();
	});
});

//-------------------------------------------------------------------
function makeAdded(element) {
	var buttons  = element.getElementsByClassName('add-button');
	if(buttons != null) {
		for(var i = 0; i < buttons.length; i++)
			buttons[i].addEventListener('mousedown', function(e){
				addComponent(element);
		});
	}
}

//------------------------------------------------------------------

function makeResizeable(element, i) {
	element.addEventListener('click', function() {
		if(i == 0){ sizeK = 1; pizzaSize = 1;}
		if(i == 1){ sizeK = 1.3; pizzaSize = 2;}
		if(i == 2){ sizeK = 1.5; pizzaSize = 3;}

		if(selectedSize != null){
			selectedSize.style.backgroundColor = '#f0f0f0';
		}
		selectedSize = element;
		selectedSize.style.backgroundColor = 'rgb(194, 169, 169)';
		selectedSize.style.color = 'white';

		recalculate();
	});
}

//-------------------------------------------------------------------
function addComponent(element){
	//Проверяем добавлена ли основа
	var baseAdded = false;
	if(order.length <= 0)
		if(element.querySelector('.title').getAttribute('title') == 'Основа')
			baseAdded = true;
	for(var i = 0; i < order.length; i++) {
		if(order[i].querySelector('.title').getAttribute('title') == 'Основа')
		baseAdded = true;
	}
	if(!baseAdded) {
		alert('Добавьте основу');
		return;
	}

	//Проверяем было ли уже добавлено
	if(checkForAdded(element.querySelector('.title').getAttribute('title'))) {
		alert('Элемент был добавлен');
		return;
	}

	//получаем параметры из сабдивов
	var info = element.querySelector('.info');
	var div = document.createElement('div');
	div.className = 'layered-component';
	div.style.backgroundImage = 'url(' + info.getAttribute('layer') + ')';
	workplace.appendChild(div);
	element.layer = div;

	order.push(element);
	recalculate();
}

//-------------------------------------------------------------------
function checkForAdded(element) {
	for(var i = 0; i < order.length; i++) {
		var currentElementFromOrder = order[i].querySelector('.title').getAttribute('title');
		if(currentElementFromOrder == element)
			return true;
	}
	return false;
}

//-------------------------------------------------------------------
function delComponent(element){
	workplace.removeChild(element.layer);
	// обнуляем положение элемента (возвращаем в список доступных компонентов)
	element.style.position = '';
	// делаем видимым
	element.style.display = 'block';
	element.style.marginTop = '20px';
	element.style.opacity = 1;

	// удаление из components
	for(var i = 0; i < components.length; i++){
		if(components[i] == element){
			components.splice(i, 1);
			break;
		}
	}

	recalculate();
}

//-------------------------------------------------------------------
function recalculate(){
	var price = 0;
	for(var i = 0; i < order.length; i++){
		var info = order[i].querySelector('.price');
		price += Number(info.getAttribute('value') * sizeK);
	}
	calculation.textContent = 'Итоговая стоимость: ' + price + ' руб.';

	var form = $('#form');
	var componentIds = [];
	for(var i = 0; i < order.length; i++) {
		componentIds.push(order[i].querySelector('.info').getAttribute('componentId'));
	}
	var json = JSON.stringify(componentIds);
	form.submit(function () {
		$.ajax({
			type: form.attr('method'),
			url:  form.attr('action'),
			data: json,
			success: function () {
				alert('opa');

			}
		});

		return false;
	});
}


function sendOrder() {
	var form = $('#form');
	var componentIds = [];
	for(var i = 0; i < order.length; i++) {
		componentIds.push(order[i].querySelector('.info').getAttribute('componentId'));
	}

	var out = '';
	for(var i = 0; i < componentIds.length; i++) {
		out += componentIds[i];
		if(i < componentIds.length - 1)
			out += ',';
	}
	var input = $('#componentsId');
	var size  = $('#size');
	input.val(out);
	size.val(pizzaSize);
}