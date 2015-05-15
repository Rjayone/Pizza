<%--
  Created by IntelliJ IDEA.
  User: Andrew
  Date: 09.05.2015
  Time: 18:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="../css/make.css" />
	<script src="../js/make.js"></script>
	<script src="../js/jquery.min.js"></script>
	<title>Make your pizza</title>

</head>
<body>
	<div class="components-side-bar" name="comprList">
		<div class="search">
			<input type="text" style="width: 90%;">
			<img src="../img/search.png" style="padding-left: 8px; position: fixed;"/>
		</div>
		<c:forEach var="component" items="${components}">
			<%--<c:if test="${component.category == 'Cheese'}">--%>
				<%--<div class="category">--%>
					<%--${component.category}--%>
				<%--</div>--%>
			<%--</c:if>--%>
			<div class="component-cell" id="cell">
				<div> <img src="${component.imgPath}"  draggable="false" layer="${component.layer} price="${component.price} id="${component.id}" name="${component.name}" /></div>
				<div class="info">
					<p class="title">${component.name}</p>
					<p class="price" name="price" value="${component.price}">${component.price} руб.</p>
					<form action="make">
						<button type="submit" name="command" value="addComponent" class="add-button"></button>
						<input type="hidden" name="id" value="${component.id}"/>
					</form>
				</div>
			</div>
		</c:forEach>
		</div>
	<div class="workplace" name="workplace">
		<div style="background-image: url(../img/components/base.png)" class="component base"></div>
<!--		<div style="background-image: url(../img/components/815710_L7UKW.png)" class="component"/> -->
	</div>
	<div class="calculation" name="calculation">0</div>
</body>
</html>
