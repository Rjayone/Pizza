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
  <link rel="stylesheet" type="text/css" href="../css/indexPage.css" />
  <link rel="stylesheet" type="text/css" href="../css/descr.css" />
  <title>
    Misha Pizza
  </title>
</head>
<body>
<div class="background-head">
  <div class="welcom"><!--Добро пожаловать!--></div>
</div>
<div class="content-view" name="content">
  <div class="make-yourself"> ПРИГОТОВЬ ПИЦЦУ НА СВОЙ ВКУС
    <div class="make-yourself-description">
      Здесь много текста о том, как ты можешь приготовить свою пиццу сам.
      Данный сервис предоставляет уникальную возможность сделать пиццу по своему предпочтению.
      Для этого вам достаточно из списка доступных ингредиентов выбрать необходимые
      и слой за слоем наполнить пиццу начинкой. После проводиться калькуляция и
      указывается время доставки с учетом приготовления.
    </div>
    <div class="manual-1">
      1. Выберите основу для пиццы. Подберите необходимые соусы и специи. Возможно вы захотите использовать сыр? Нет проблем. Все в ваших руках!
    </div>
    <div class="manual-2">
      2. Используйте один из нескольких готовых вариантов начинки или заполните пиццу сами. Вам будет доступно 3 слоя начинки для заполнения, по несколько ингредиентов в одной группе. Сделайте свою пиццу уникальных и удиви друзей!
    </div>
    <div class="manual-2">
      3. Проверьте правилность заказа. Подтвердите заказ с указанной суммой. После этого с вами свяжется курьер и уточнит время доставки.
    </div>
  </div>
  <form name="Begin" action="make" method="post">
    <div>
      <button type="submit" class="button" name="command" value="begin" style="background-color: transparent; border: 0"/>
    </div>
  </form>
</div>
</body>
</html>
