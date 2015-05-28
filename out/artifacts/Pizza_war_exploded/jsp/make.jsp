<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="../css/make.css" />
	<link rel="stylesheet" type="text/css" href="../css/components.css" />
	<script src="../js/make.js"></script>
	<script src="../js/jquery.min.js"></script>
	<title>PizzaMaker</title>

</head>
<body>
	<div class="components-side-bar" name="comprList">
		<%--<div class="search">--%>
			<%--<input type="text" style="width: 90%;">--%>
			<%--<img src="../img/search.png" style="padding-left: 8px; position: fixed;"/>--%>
		<%--</div>--%>
		<div class="sizes">
			<div class="size" id="size-18"><div style="margin-top:17.5%;">18 см</div></div>
			<div class="size" id="size-24"><div style="margin-top:17.5%;">24 cм</div></div>
			<div class="size" id="size-32"><div style="margin-top:17.5%;">32 см</div></div>
		</div>
		<%String cat = "0";%>
		<c:forEach var="component" items="${components}">
			<c:set var="comp" value="${component.category}"/>
			<% if(!cat.equals(pageContext.getAttribute("comp"))) {
				cat = (String)pageContext.getAttribute("comp"); %>
				<div class="group-title">
					${component.categoryTitle}
				</div>
			<%}%>
			<div class="component-cell" id="cell">
				<div> <img src="${component.imgPath}"  draggable="false"/></div>
				<div class="info" componentId="${component.id}" category="${component.category}" imgPath="${component.imgPath}" layer="${component.layer}">
					<p class="title" title="${component.name}">${component.name}</p>
					<p class="price" name="price" value="${component.price}">${component.price} руб.</p>
					<%--<form action="make">--%>
						<button name="command" value="addComponent" class="add-button"></button>
						<input type="hidden" name="id" value="${component.id}"/>
					<%--</form>--%>
				</div>
			</div>
		</c:forEach>
		</div>
	<div class="workplace" name="workplace"></div>
	<div class="calculation" name="calculation">
		<div class="total-price">Итоговая стоимость: 0 руб.
		</div>
		<div style="text-align: left; padding-left: 30px; color: gray; font-size: 14;">
			Вы выбрали следующие компоненты:</div>
		<div class="selected-components" id="selected-components" style="overflow: scroll">
		</div>
		<form name="sendOrder" method="post" action="done" id="sendOrder">
			<input type="button" class="send-order" value=""/>
			<input type="hidden" name="command" value="forward"/>
			<input type="hidden" name="componentsId" value="" id="componentsId"/>
			<input type="hidden" name="size" value="" id="size"/>
		</form>
	</div>
</body>
</html>
