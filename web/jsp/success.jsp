<%--
  Created by IntelliJ IDEA.
  User: Andrew
  Date: 20.04.2015
  Time: 14:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
<!--   <meta charset="utf-8"/> -->
  <link rel="stylesheet" type="text/css" href="../css/success.css" />
  <title>
    Misha Pizza
  </title>
</head>
<body>
<div class="head">
  <p>Ваш заказ был успешно оформлен и передан на обработку. Ожидайте звонка оператора для уточнения деталей.</p>
</div>
<div class="comeback">
  <form method="post" action="make">
    <input type="submit" class="button" value="Создать новую пиццу" name="Создать новую пиццу"/>
    <input type="hidden" name="command" value="begin"/>
  </form>
</div>
</body>
</html>
