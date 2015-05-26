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
			<form method="post" action="confirm">
				<input type="hidden" name="command" value="confirm"/>
				<p class="phone">Номер телефона</p>
				<input type="tel" placeholder="+375-xx-xxx-xx-xx" class="text" id="phone"/>
				<p class="price">Количество пицц</p>
				<input type="text" title="" value="1" placeholder="1" class="text" id="count"/>
				<p class="total-price">Сумма заказа составляет ${orderPrice} руб.</p>
				<input type="submit" class="confirm-button"/>
			</form>
			<p class="thank">Спасибо, что выбрали наш сервис :)</p>
		</div>
	</body>
</html>
