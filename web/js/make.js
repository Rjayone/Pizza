window.addEventListener('load', function(){
	// запустится после загрузки страницы

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
	});
	document.body.addEventListener('mouseup', function(e){
		var rect = document.querySelector('.workplace').getBoundingClientRect();
		if(dragging && isCoordInRect(rect, e.clientX, e.clientY)){
			addComponent(element);
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
	;
}