class CanvasDrawer {
	SIZE = 450;
	LINE_WIDTH = 2;
	TEXT_SIZE = 20;
	TEXT_MARGIN = 15;
	TEXT_LINE_HEIGHT = 3;
	COLOR_RED = "#ff0000"
	COLOR_GREEN = "#00ff00"
	totalPoints = 12;
	dots = [];
	pointInPixels = this.SIZE / this.totalPoints;

	constructor() {
		console.log(sessionStorage.getItem("dots"));
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.font = `${this.TEXT_SIZE}px Soyuz Grotesk`;
		this.canvas.addEventListener("click", (ev) => {
			const rect = this.canvas.getBoundingClientRect();
			const clickX = ev.clientX - rect.left;
			const clickY = ev.clientY - rect.top;

			let graphX = (clickX - this.SIZE / 2) / (this.SIZE / 12);
			let graphY = -(clickY - this.SIZE / 2) / (this.SIZE / 12);

			graphX = graphX.toFixed(3);
			graphY = graphY.toFixed(3);
			if (graphX < -3 || graphX > 3 || graphY < -5 || graphY > 3) {
				alert("НУ НЕЕЕТ");
				return;
			}
			sendForm(graphX, graphY);
			console.log(graphX, graphY);
		});
	}

	redrawAll(r = 1) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawGraph(r);
		this.drawAxes();
		this.setPointerAtDot(5);
		this.setPointerAtDot(1);
		this.dots.forEach(e => {
			this.drawPoint(e.x, e.y, e.hit && (e.hit !== "Нет("), false);
		});
	}

	drawAxes() {
		this.ctx.fillStyle = "black";
		this.drawArrow(-this.SIZE, this.SIZE / 2, this.SIZE, this.SIZE / 2);
		this.drawArrow(this.SIZE / 2, this.SIZE, this.SIZE / 2, 0);
	}

	drawGraph(r) {

		const totalPoints = this.totalPoints;
		const pointInPixels = this.SIZE / totalPoints;

		let rColor = (Math.random() * 255).toFixed(0),
			gColor = (Math.random() * 255).toFixed(0),
			bColor = (Math.random() * 255).toFixed(0);

		this.ctx.fillStyle = `rgba(${rColor},${gColor},${bColor},0.35)`;

		this.ctx.fillRect(this.SIZE / 2 - r * this.pointInPixels, this.SIZE / 2 - r * pointInPixels, r * pointInPixels, r * pointInPixels);

		this.ctx.beginPath();
		this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
		this.ctx.lineTo(this.SIZE / 2 + r / 2 * this.pointInPixels, this.SIZE / 2);
		this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 + r / 2 * this.pointInPixels);
		this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
		this.ctx.fill();


		this.ctx.beginPath();
		this.ctx.arc(
			this.SIZE / 2,
			this.SIZE / 2,
			r * this.pointInPixels,
			0,
			-Math.PI / 2,
			true
		);
		this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
		this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 - r * this.pointInPixels);
		this.ctx.lineTo(this.SIZE / 2 + r * this.pointInPixels, this.SIZE / 2);
		this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
		this.ctx.fill();
	}

	setPointerAtDot(max_r = 5) {
		const totalPoints = this.totalPoints;
		const pointInPixels = this.SIZE / totalPoints;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(`${max_r}`, this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_MARGIN);
		this.ctx.fillText(`${max_r}`, this.SIZE / 2 + this.TEXT_MARGIN, this.SIZE / 2 - pointInPixels * max_r);

		this.ctx.beginPath()
		this.ctx.lineWidth = this.LINE_WIDTH;
		this.ctx.moveTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT);
		this.ctx.lineTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT);
		this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
		this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
		this.ctx.stroke();
	}

	drawArrow(fromx, fromy, tox, toy) {
		let headlen = 10; // length of head in pixels
		let dx = tox - fromx;
		let dy = toy - fromy;
		let angle = Math.atan2(dy, dx);
		this.ctx.beginPath();
		this.ctx.lineWidth = this.LINE_WIDTH;
		this.ctx.moveTo(fromx, fromy);
		this.ctx.lineTo(tox, toy);
		this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
		this.ctx.moveTo(tox, toy);
		this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
		this.ctx.stroke();
	}

	drawPoint(x, y, success, push=true) {
		console.log(`drawPoint: x = ${x}, y = ${y}`);
		if (push) this.dots.push({"x": x, "y": y, "hit": success});
		this.ctx.fillStyle = success
			? this.COLOR_GREEN
			: this.COLOR_RED;
		const totalPoints = 12;
		const pointInPixels = this.SIZE / totalPoints;
		this.ctx.beginPath();
		this.ctx.arc(
			this.SIZE / 2 + pointInPixels * x,
			this.SIZE / 2 - y * pointInPixels,
			5,
			0,
			Math.PI * 2,
		);
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.fillStyle = "black"
		this.ctx.lineWidth = 1.5
		this.ctx.arc(
			this.SIZE / 2 + pointInPixels * x,
			this.SIZE / 2 - y * pointInPixels,
			5,
			0,
			Math.PI * 2
		)
		this.ctx.stroke();
	}
}