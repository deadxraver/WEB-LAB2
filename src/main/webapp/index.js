let x = null;
let y = null;
let r = 1;
let buttob;
let canvasDrawer;

function checkNum(a) {
	return !isNaN(a) && a !== null;
}

function validateAll() {
	if (checkNum(parseFloat(x)) && checkNum(parseFloat(y)) && checkNum(parseInt(r))) {
		buttob.style.visibility = 'visible';
	} else buttob.style.visibility = 'hidden';
}

function processError() {
	alert("Бредик не пишем");
}

function sendForm(x, y) {
	$.ajax({
		type: "GET",
		url: "http://localhost:25501/WEB-LAB2-BACKEND-1.0-SNAPSHOT/controller-servlet",
		data: {x: x, y: y, r: r},
		success: (msg) => {
			processSuccess(msg);
		},
		error: (msg) => {
			processError();
		}
	});
}

function validate() {
	return checkNum(x) && checkNum(y) && checkNum(r) && (x >= -3 && x <= 3);
}

function processSuccess(msg) {
	canvasDrawer.drawPoint(parseFloat(msg.x.replace(',', '.')), parseFloat(msg.y.replace(',', '.')), msg.hit === "Да");
	console.log(msg);

	let row = document.getElementById("resultsBody").insertRow();

	row.insertCell(0).textContent = parseFloat(msg.x.replace(',', '.')).toFixed(3);
	row.insertCell(1).textContent = parseFloat(msg.y.replace(',', '.')).toFixed(3);
	row.insertCell(2).textContent = msg.r;
	row.insertCell(3).textContent = msg.hit;
	row.insertCell(4).textContent = msg.currentTime;
	row.insertCell(5).textContent = msg.executionTime;

}

document.addEventListener("DOMContentLoaded", () => {
	canvasDrawer = new CanvasDrawer();
	canvasDrawer.redrawAll();
	buttob = document.getElementById('buttob');
	buttob.style.visibility = 'hidden';

	const yRadio = document.querySelectorAll(".yRadio");
	const xText = document.getElementById("x");
	const rSelect = document.getElementById("r");

	rSelect.addEventListener("change", (e) => {
		r = e.target.value;
		validateAll();
		canvasDrawer.redrawAll(r);
	})

	yRadio.forEach(e => {
		e.addEventListener("change", function (event) {
			if(event.target.checked) {
				y = event.target.value;
			}
			validateAll();
		});
	});

	xText.addEventListener("input", () => {
		let tmp = xText.value;
		let foundDot = false;
		x = "";
		if (!tmp) {
			buttob.style.visibility = 'hidden'
			return;
		}
		let negative = false;
		for (let i = 0; i < tmp.length; i++) {
			if (tmp[i] === '-' && i === 0) {
				negative = true;
			} else if (tmp[i] === '.' && !foundDot) {
				foundDot = true;
			} else if (isNaN(parseFloat(tmp[i]))) continue;
			x += tmp[i];
		}
		if (x.length > 1 && x[1] !== '.' && x[0] === '0') {
			x = x.substring(1);
		}
		xText.value = x;
		validateAll();
	});

	buttob.addEventListener("click", () => {
		if (validate()) sendForm(x, y);
		else alert("Проверьте корректность введенных значений");
	});
});


