<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="../css/confirm.css" />
	<script src="../js/confirm.js"></script>
	<script src="../js/jquery.min.js"></script>
	<title>Confirm</title>
</head>
	<body>
	<%--<c:set var="totalPrice" value="${orderPrice}"/>--%>
		<p class="title">Подтверждение заказа</p>
		<div class="order-form">
			<form method="post" action="/success" id="confirm">
				<input type="hidden" name="command" value="confirm"/>
				<input type="hidden" name="phone" value="1" id="requestPhone"/>
				<input type="hidden" name="count" value="1" id="requestCount"/>
				<p class="phone">Номер телефона</p>
				<input type="text" placeholder="+375-xx-xxx-xx-xx" class="text" value="" id="phone" />
				<p class="price">Количество пицц</p>
				<input type="text" value="1" placeholder="1" class="text" id="count"/>
				<p class="total-price" value="${orderPrice}">Сумма заказа составляет ${orderPrice} руб.</p>
				<input type="button" id="confirm-button" value="Отправить" width="100" height="30"/>
			</form>
			<p class="thank">Спасибо, что выбрали наш сервис :)</p>
		</div>
	</body>
</html>
