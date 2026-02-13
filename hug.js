const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let hearts = [];
let warmed = 0;
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Heart {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = 25 + Math.random() * 15;
		this.angle = Math.random() * Math.PI * 2;
		this.warmed = false;
	}

	draw() {
		this.angle += 0.01;
		const swayX = Math.cos(this.angle) * 15;
		const swayY = Math.sin(this.angle) * 8;

		const dx = mouse.x - (this.x + swayX);
		const dy = mouse.y - (this.y + swayY);
		const dist = Math.sqrt(dx * dx + dy * dy);

		if (!this.warmed && dist < 80) {
			this.warmed = true;
			warmed++;
		}

		ctx.fillStyle = this.warmed ? "#ffffff" : "rgba(255,255,255,0.5)";
		drawHeart(this.x + swayX, this.y + swayY, this.size);
	}
}

function drawHeart(x, y, size) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.bezierCurveTo(
		x - size,
		y - size,
		x - size * 1.5,
		y + size / 2,
		x,
		y + size,
	);
	ctx.bezierCurveTo(x + size * 1.5, y + size / 2, x + size, y - size, x, y);
	ctx.fill();
}

for (let i = 0; i < 15; i++) {
	hearts.push(new Heart());
}

document.addEventListener("mousemove", (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// warm aura
	const gradient = ctx.createRadialGradient(
		mouse.x,
		mouse.y,
		10,
		mouse.x,
		mouse.y,
		120,
	);
	gradient.addColorStop(0, "rgba(255,255,255,0.6)");
	gradient.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = gradient;
	ctx.beginPath();
	ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
	ctx.fill();

	hearts.forEach((h) => h.draw());

	if (warmed === hearts.length) {
		document.getElementById("completion").classList.remove("hidden");
	}

	requestAnimationFrame(animate);
}

animate();
