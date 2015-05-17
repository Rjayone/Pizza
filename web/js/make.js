var components = [], // массив из добавленных компонентов; содержит теги img с компонентами
	workplace, // .workplace
	calculation; // .calculation
var order = [];
var sizeK = 0;
var selectedSize;


//-------------------------------------------------------------------
window.addEventListener('load', function(){
	workplace = document.querySelector('.workplace');
	calculation = document.querySelector('.calculation');
	components = document.querySelectorAll('.component-cell');
	for(var i = 0; i < components.length; i++){
		makeAdded(components[i]);
	}
	var sizeButtons = document.getElementsByClassName('size');
	for(var i = 0; i < sizeButtons.length; i++) {
		makeResizeable(sizeButtons[i], i);
	}
	recalculate();
});

//-------------------------------------------------------------------
function makeDraggable(element){

	var dragging = false,
		x = 0,
		y = 0;

	element.addEventListener('mousedown', function(e){
		Console.log("drag");
		var rect = element.getBoundingClientRect();
		// считаем координаты мыши относительно начала объекта (где 0,0 - левая верхняя точка объекта)
		x = Math.round(e.clientX - rect.left); // round -- округление
		y = Math.round(e.clientY - rect.top);

		dragging = true;
		element.style.position = 'absolute';
		element.style.marginTop = '-25px';
		element.style.top  = e.clientY - y + 'px';
		element.style.left = e.clientX - x + 'px';

		var rect = element.getBoundingClientRect();
		x = e.clientX - rect.left;
		y = e.clientY - rect.top;

		//Простая анимация
		var start = Date.now();
		var timer = setInterval(function () {
			// вычислить сколько времени прошло с начала анимации
			var timePassed = Date.now() - start;
			if (timePassed >= 1000 || dragging == false) {
				clearInterval(timer); // конец через 2 секунды
				return;
			}

			// рисует состояние анимации, соответствующее времени timePassed
			draw(timePassed);

		}, 10);

		// в то время как timePassed идёт от 0 до 2000
		// left принимает значения от 0 до 400px
		function draw(timePassed) {
			console.log(timePassed);
			element.style.left += timePassed / 5 - 'px';
		}
		// делаем полупрозрачным на время перетаскивания
		element.style.opacity = 0.7;
	});

	document.body.addEventListener('mouseup', function(e){
		var rect = document.querySelector('.workplace').getBoundingClientRect();

		if(dragging){ // перетаскивался именно текущий компонент, или же другой
			if(isCoordInRect(rect, e.clientX, e.clientY)){
				addComponent(element);
				element.style.display = 'none'; // делаем компонент невидимым
			}
			else {
				element.style.position = '';
				element.style.marginTop = '20px';
				element.style.opacity = 1;
			}
		}

		dragging = false;
	});

	document.body.addEventListener('mousemove', function(e){
		if(!dragging) return;
		element.style.top  = e.clientY - y + 'px';
		element.style.left = e.clientX - x + 'px';
	});

}

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
		if(i == 0) sizeK = 1;
		if(i == 1) sizeK = 1.3;
		if(i == 2) sizeK = 1.5;

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
	calculation.textContent = price + ' руб.';
}