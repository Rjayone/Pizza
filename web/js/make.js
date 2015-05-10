var components = [], // массив из добавленных компонентов; содержит теги img с компонентами
	workplace, // .workplace
	calculation; // .calculation

window.addEventListener('load', function(){
	// запустится после загрузки страницы

	workplace = document.querySelector('.workplace');
	calculation = document.querySelector('.calculation');

	// это локальная переменная
	var components = document.querySelectorAll('.components-side-bar img');
	for(var i = 0; i < components.length; i++){
		makeDraggable(components[i]);
	}

});

function makeDraggable(element){

	var dragging = false,
		x = 0,
		y = 0;

	element.addEventListener('mousedown', function(e){
		var rect = element.getBoundingClientRect();
		// считаем координаты мыши относительно начала объекта (где 0,0 - левая верхняя точка объекта)
		x = Math.round(e.clientX - rect.left); // round -- округление
		y = Math.round(e.clientY - rect.top);

		dragging = true;
		element.style.position = 'absolute';
		element.style.marginTop = '-25px';
		element.style.top  = e.clientY - y + 'px';
		element.style.left = e.clientX - x + 'px';

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

function isCoordInRect(rect, x, y){
	return x < rect.left + rect.width && x > rect.left && y < rect.top + rect.height && y > rect.top;
}

function addComponent(element){
	var div = document.createElement('div');
	div.className = 'component';
	div.style.backgroundImage = 'url(../img/components/' + element.getAttribute('layer') + ')';
	workplace.appendChild(div);
	element.layer = div;

	components.push(element);
	recalculate();
}

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

function recalculate(){
	var price = 0;
	for(var i = 0; i < components.length; i++){
		price += Number(components[i].getAttribute('price'));
	}
	calculation.textContent = price;
}