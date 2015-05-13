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
	<title>
		Make your pizza
	</title>
	<script src="../js/make.js"></script>
	<script src="../js/jquery.min.js"></script>
</head>
<body>
<!--   <form name="updatePrice" action="controller" method="post">
      <input type="hiden" name="command" value="updatePrice"/>
  </form> -->
	<div class="components-side-bar" name="comprList">
		${newString}
		<c:forEach var="component" items="${components}">
			${component.}
		</c:forEach>
		<img src="../img/components/1cb017230f67.png" draggable="false" layer="815710_L7UKW.png" price="10" component="a"/>
		<img src="../img/components/120214130615-120328183910-p-O-sir-gauda.png" draggable="false" layer="120214130615-120328183910-p-O-sir-gauda.png" price="10" component="b"/>
		<img src="../img/components/Диетический-соевый-майонез.png" draggable="false" layer="Диетический-соевый-майонез.png" price="10" component="c"/>
		<img src="../img/components/bazilik.png" draggable="false" layer="bazilik.png" price="15" component="d"/>
	</div>
	<div class="workplace" name="workplace">
		<div style="background-image: url(../img/components/base.png)" class="component base"></div>
<!--		<div style="background-image: url(../img/components/815710_L7UKW.png)" class="component"/> -->
	</div>
	<div class="calculation" name="calculation">0</div>
</body>
</html>
