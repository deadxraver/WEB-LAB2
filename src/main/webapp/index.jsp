<%@ page import="app.weblab2backend.response.Response" %>
<%@ page import="java.util.LinkedList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ребят... боюсь....</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="icon.png">
</head>
<body>
<header>
    <p style="color:rgb(<%=(int)(Math.random() * 255)%>, <%=(int)(Math.random() * 255)%>, <%=(int)(Math.random() * 255)%>)">
        Чумаченко Даниил Олегович</p>
    <p style="color:rgb(<%=(int)(Math.random() * 255)%>, <%=(int)(Math.random() * 255)%>, <%=(int)(Math.random() * 255)%>)">
        P3215</p>
    <p style="color:rgb(<%=(int)(Math.random() * 255)%>, <%=(int)(Math.random() * 255)%>, <%=(int)(Math.random() * 255)%>)">
        34564374</p>
</header>

<table>
    <tr>
        <th>Поле</th>
        <th>Значение</th>
    </tr>
    <tr>
        <td>X</td>
        <td><label for="x"></label><input type="text" id="x" name="x" placeholder="значение от -3 до 3"></td>

    </tr>
    <tr>
        <td>Y</td>
        <td style="display: flex">
            <label>-5<input type="radio" name="y" value="-5" class="yRadio"></label>
            <label>-4<input type="radio" name="y" value="-4" class="yRadio"></label>
            <label>-3<input type="radio" name="y" value="-3" class="yRadio"></label>
            <label>-2<input type="radio" name="y" value="-2" class="yRadio"></label>
            <label>-1<input type="radio" name="y" value="-1" class="yRadio"></label>
            <label>0<input type="radio" name="y" value="0" class="yRadio"></label>
            <label>1<input type="radio" name="y" value="1" class="yRadio"></label>
            <label>2<input type="radio" name="y" value="2" class="yRadio"></label>
            <label>3<input type="radio" name="y" value="3" class="yRadio"></label>
        </td>
    </tr>
    <tr>
        <td>R</td>
        <td>
            <label for="r"></label><select id="r" name="r">
            <% if (request.getSession().getAttribute("r") == null) request.getSession().setAttribute("r", "1"); %>
            <option <%= request.getSession().getAttribute("r").equals("1") ? "selected=\"selected\"" : "" %> value="1">
                1
            </option>
            <option <%= request.getSession().getAttribute("r").equals("2") ? "selected=\"selected\"" : "" %> value="2">
                2
            </option>
            <option <%= request.getSession().getAttribute("r").equals("3") ? "selected=\"selected\"" : "" %> value="3">
                3
            </option>
            <option <%= request.getSession().getAttribute("r").equals("4") ? "selected=\"selected\"" : "" %> value="4">
                4
            </option>
            <option <%= request.getSession().getAttribute("r").equals("5") ? "selected=\"selected\"" : "" %> value="5">
                5
            </option>
        </select>
        </td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center">
            <input id="buttob" type="submit" value="Отправить" src="img.png">
        </td>
    </tr>
</table>

<div class="image-container">
    <h3>График области</h3>
    <canvas id="canvas" width="450px" height="450px"></canvas>
</div>

<table class="results-table" id="resultsTable">
    <thead>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Попадание</th>
        <th>Текущее время</th>
        <th>Время выполнения</th>
    </tr>
    </thead>
    <tbody id="resultsBody">
    <%
        Object o = request.getSession().getAttribute("dots");
        LinkedList<Response> dots = o == null ? new LinkedList<>() : (LinkedList<Response>) o;
        if (dots != null) {
            for (Response rp : dots) {
    %>
    <tr class="row">
        <td><%= String.format("%.3f", rp.x()).replace(',', '.') %>
        </td>
        <td><%= String.format("%.3f", rp.y()).replace(',', '.') %>
        </td>
        <td><%= rp.r() %>
        </td>
        <td><%= rp.hit() ? "Да" : "Нет(" %>
        </td>
        <td><%= String.format("%d.%d.%d %d:%d", rp.time().getDayOfMonth(), rp.time().getMonth().getValue(), rp.time().getYear(), rp.time().getHour(), rp.time().getMinute()) %>
        </td>
        <td><%= rp.execTime() %> ms</td>
    </tr>
    <%
            }
        }
    %>
    </tbody>
</table>
<a href="controller-servlet"></a>
<script src="libs/jquery.min.js"></script>
<script src="index.js"></script>
<script src="CanvasDrawer.js"></script>
<script>
	canvasDrawer = !canvasDrawer ? new CanvasDrawer() : canvasDrawer;
	let dot;
	<%
	o = request.getSession().getAttribute("dots");
	dots = o == null ? new LinkedList<>( ) : (LinkedList<Response>) o;
	for (Response rp : dots) {%>
	if (!canvasDrawer.dots) canvasDrawer.dots = [];
	dot = <%=rp%>;
	if (dot) {
		dot.x = dot.x.replace(',', '.');
		dot.y = dot.y.replace(',', '.');
		canvasDrawer.dots.push(dot);
	}
	<% }%>
	console.log(canvasDrawer.dots);
	r = sessionStorage.getItem("r");
	r = r ? r : 1;
	canvasDrawer.redrawAll(r);
	console.log("redrew in doc", r);
</script>
</body>
</html>
