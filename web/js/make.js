var components = [], // массив из добавленных компонентов; содержит теги img с компонентами
	workplace, // .workplace
	calculation; // .calculation

var order = []; //Выбранные компоненты в заказ
var sizeK = 0; //коэф. скалирования
var pizzaSize = 0; //выбранный размер
var selectedSize;
var sendOrderData;

var componentsScrollPane; //Базовый элемент
var scrollPaneComponents = []; //Массив объектов снизу. Использовать compImg, compName

//-------------------------------------------------------------------
window.addEventListener('load', function(){
	order = [];
	workplace = document.querySelector('.workplace');
	calculation = document.querySelector('.total-price');
	components = document.querySelectorAll('.component-cell');
	componentsScrollPane = document.getElementById('selected-components');
	for(var i = 0; i < components.length; i++){
		makeAdded(components[i]);
	}
	var sizeButtons = document.getElementsByClassName('size');
	for(var i = 0; i < sizeButtons.length; i++) {
		makeResizeable(sizeButtons[i], i);
	}
	sizeButtons[0].click();
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
	var category = info.getAttribute('category');
	div.className = 'layered-component';
	div.style.backgroundImage = 'url(' + info.getAttribute('layer') + ')';
	div.style.zIndex = category;
	workplace.appendChild(div);
	element.layer = div;

	//make little copy
	if(componentsScrollPane) {
		var littleDiv = document.createElement('div');
		littleDiv.className = 'order-component';
		componentsScrollPane.appendChild(littleDiv);

		var listCompImg = document.createElement('div');
		listCompImg.className = 'list-component-img';
		littleDiv.appendChild(listCompImg);


		var Img = document.createElement('img');
		Img.src = info.getAttribute('imgPath');
		Img.style.width = '80px';
		listCompImg.appendChild(Img);

		var listCompInfo = document.createElement('div');
		listCompInfo.className = 'list-component-info';
		littleDiv.appendChild(listCompInfo);

		var Info = document.createElement('p');
		Info.id = 'list-component-info-text';
		Info.textContent = element.querySelector('.title').getAttribute('title');
		listCompInfo.appendChild(Info);

		var trash = document.createElement('img');
		trash.className = 'list-component-trash';
		trash.src = '../img/trash.png';
		littleDiv.appendChild(trash);

		trash.addEventListener('click', function() {
			delComponent(element, littleDiv);
		});

		scrollPaneComponents.push(littleDiv);

	}
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
function delComponent(element, div){
	document.getElementById('selected-components').removeChild(div);
	workplace.removeChild(element.layer);


	//Если удаляем основу то должны удалиться все компоненты
	for(var i = 0; i < order.length; i++) {
		if (order[i] == element ) {
			order.splice(i, 1);
			if(element.querySelector('.title').getAttribute('title') == 'Основа') {
				for(var j = 0; j < order.length; j++) {
					workplace.removeChild(order[j].layer);
				}

				var orderComponents = document.getElementsByClassName('order-component');
				for(var j = 0; j < orderComponents.length; j++)
					orderComponents[i].parentNode.removeChild(orderComponents[j]);
				order = [];
				break;
			}
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
	var form = $('#sendOrder');
	var componentIds = [];
	if(order.length <= 1) {
		alert('Вы не выбрали ни одного компонента для пиццы');
		return;
	}

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

	form.submit();
}