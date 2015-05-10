window.addEventListener('load', function(){
	// запустится после загрузки страницы
	document.forms["updatePrice"].submit();

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
		dragging = true;
		element.style.position = 'absolute';

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
	});

	document.body.addEventListener('mouseup', function(e){
		var rect = document.querySelector('.workplace').getBoundingClientRect();
		if(dragging && isCoordInRect(rect, e.clientX, e.clientY)){
			addComponent(element);
			element.style.display = 'none';
		} else {
			element.style.position = '';
		}
		dragging = false;
	});

	document.body.addEventListener('mousemove', function(e){
		if(!dragging) return;
		element.style.top  = e.clientY - y*2 + 'px';
		element.style.left = e.clientX - x/2 + 'px';
	});

}

function isCoordInRect(rect, x, y){
	return x < rect.left + rect.width && x > rect.left && y < rect.top + rect.height && y > rect.top;
}

function addComponent(element){
	var div = document.createElement('div');
	div.className = 'component';
//	element.getAttribute('name');
	div.style.backgroundImage = 'url(../img/components/' + element.name + ')';
	document.querySelector('.workplace').appendChild(div);
}