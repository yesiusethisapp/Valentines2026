const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let stars = [];
let connections = [];
let activatedCount = 0;

const promises = [
	"I promise to choose you.",
	"I promise to protect your peace.",
	"I promise to grow with you.",
	"I promise to stand steady.",
	"I promise to love you gently.",
	"I promise forever.",
];

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Star {
	constructor(text) {
		this.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
		this.y = Math.random() * canvas.height * 0.6 + canvas.height * 0.2;
		this.baseRadius = 8;
		this.radius = this.baseRadius;
		this.activated = false;
		this.text = text;
		this.pulse = Math.random() * Math.PI * 2;
	}

	draw() {
		this.pulse += 0.03;
		const glow = Math.sin(this.pulse) * 2;

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius + glow, 0, Math.PI * 2);
		ctx.fillStyle = this.activated ? "#ffffff" : "#b784ff";
		ctx.shadowBlur = this.activated ? 25 : 8;
		ctx.shadowColor = "#ff9efc";
		ctx.fill();
	}

	checkClick(mx, my) {
		const dx = mx - this.x;
		const dy = my - this.y;
		const dist = Math.sqrt(dx * dx + dy * dy);
		if (dist < 15 && !this.activated) {
			this.activated = true;
			activatedCount++;
			connections.push(this);
			showFloatingText(this.text, this.x, this.y);
		}
	}
}

stars = promises.map((p) => new Star(p));

function showFloatingText(text, x, y) {
	const el = document.createElement("div");
	el.textContent = text;
	el.style.position = "fixed";
	el.style.left = x + "px";
	el.style.top = y + "px";
	el.style.color = "white";
	el.style.fontSize = "1rem";
	el.style.opacity = "1";
	el.style.transition = "all 2s ease";
	document.body.appendChild(el);

	setTimeout(() => {
		el.style.transform = "translateY(-40px)";
		el.style.opacity = "0";
	}, 50);

	setTimeout(() => el.remove(), 2000);
}

canvas.addEventListener("click", (e) => {
	const rect = canvas.getBoundingClientRect();
	const mx = e.clientX - rect.left;
	const my = e.clientY - rect.top;
	stars.forEach((star) => star.checkClick(mx, my));

	if (activatedCount === stars.length) {
		document.getElementById("finalMessage").classList.remove("hidden");
	}
});

function drawConnections() {
	if (connections.length < 2) return;

	ctx.beginPath();
	ctx.strokeStyle = "#ffffff88";
	ctx.lineWidth = 2;

	ctx.moveTo(connections[0].x, connections[0].y);
	for (let i = 1; i < connections.length; i++) {
		ctx.lineTo(connections[i].x, connections[i].y);
	}

	ctx.stroke();
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	stars.forEach((star) => star.draw());
	drawConnections();
	requestAnimationFrame(animate);
}

animate();
