const canvas = document.getElementById("teddyCanvas");
const ctx = canvas.getContext("2d");

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let hug = false;
let progress = 0;
let sway = 0;
let breathe = 0;
let hearts = [];
let whispers = [];

const whisperTexts = [
	"you are so deeply loved",
	"you are appreciated more than you know",
	"you make everything warmer",
	"you are safe here",
	"you matter so much",
	"you are cherished",
	"you are enough",
	"you bring comfort just by being you",
	"you are treasured",
	"you are held, always",
	"you are my favorite person in the world",
	"you are the best thing that ever happened to me",
	"you are my sunshine on the darkest days",
	"you are the reason for my smiles",
	"you are my heart's home",
	"you are the sweetest part of my life",
	"you are the most precious gift",
	"you are the love of my life",
	"you are my forever and always",
	"you are the light that guides me",
	"you are the warmth in my soul",
	"you are the one I want to hug forever",
	"you are the best hug in the world",
	"you are the coziest, snuggliest teddy bear",
	"you are the most huggable person I know",
	"you are the reason I want to hug you every day",
	"you are the one I want to hold close forever",
	"you are the best cuddle buddy in the world",
	"you are the most comforting presence in my life",
	"you are the one I want to wrap my arms around forever",
	"you are the best hugger in the universe",
	"you are the most lovable person I know",
	"you are the reason I want to hug you right now",
	"you are the one I want to snuggle with forever",
	"you are the best teddy bear hugger in existence",
	"you are the most affectionate person I know",
	"you are the reason I want to hug you so tightly",
	"you are the one I want to hold in my arms forever",
	"i love you more than words can say",
];

/* easing */
function ease(t) {
	return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* floating hearts */
function spawnHearts() {
	for (let i = 0; i < 10; i++) {
		hearts.push({
			x: canvas.width / 2 + (Math.random() - 0.5) * 40,
			y: canvas.height / 2,
			vy: -Math.random() * 0.8 - 0.3,
			size: Math.random() * 10 + 8,
			alpha: 1,
		});
	}
}

/* whisper messages */
function spawnWhisper() {
	whispers.push({
		text: whisperTexts[Math.floor(Math.random() * whisperTexts.length)],
		x: Math.random() * canvas.width,
		y: canvas.height + 40,
		alpha: 0,
		speed: Math.random() * 0.6 + 0.15,
	});
}

setInterval(spawnWhisper, 2600);

function drawWhispers() {
	whispers.forEach((w) => {
		w.y -= w.speed;
		w.alpha = Math.min(1, w.alpha + 0.005);

		ctx.globalAlpha = w.alpha * 0.7;
		ctx.fillStyle = "#7a4a26";
		ctx.font = "italic 20px Georgia";
		ctx.fillText(w.text, w.x, w.y);
		ctx.globalAlpha = 1;
	});

	whispers = whispers.filter((w) => w.y > -60);
}

function drawHearts() {
	hearts.forEach((h) => {
		ctx.globalAlpha = h.alpha;
		ctx.fillStyle = "#ff8fa3";
		ctx.beginPath();
		ctx.moveTo(h.x, h.y);
		ctx.bezierCurveTo(
			h.x - h.size,
			h.y - h.size,
			h.x - h.size * 1.2,
			h.y + h.size / 2,
			h.x,
			h.y + h.size,
		);
		ctx.bezierCurveTo(
			h.x + h.size * 1.2,
			h.y + h.size / 2,
			h.x + h.size,
			h.y - h.size,
			h.x,
			h.y,
		);
		ctx.fill();
		ctx.globalAlpha = 1;

		h.y += h.vy;
		h.alpha -= 0.005;
	});

	hearts = hearts.filter((h) => h.alpha > 0);
}

function drawTeddy(p) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const e = ease(p);
	sway += 0.002;
	breathe += 0.015;

	const swayX = Math.sin(sway) * 10;
	const breath = Math.sin(breathe) * 3;

	const cx = canvas.width / 2 + swayX;
	const cy = canvas.height / 2 + 60;

	const bodyR = 95 + e * 18 + breath;
	const headR = 65 + e * 10;
	const armLen = 120 + e * (canvas.width / 2);

	/* arms behind */
	ctx.strokeStyle = "#7a4a26";
	ctx.lineWidth = 32;
	ctx.lineCap = "round";

	ctx.beginPath();
	ctx.moveTo(cx - bodyR + 10, cy);
	ctx.lineTo(cx - armLen, cy + 40);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(cx + bodyR - 10, cy);
	ctx.lineTo(cx + armLen, cy + 40);
	ctx.stroke();

	/* body */
	ctx.fillStyle = "#8b5a2b";
	ctx.beginPath();
	ctx.arc(cx, cy, bodyR, 0, Math.PI * 2);
	ctx.fill();

	/* belly */
	ctx.fillStyle = "#cfa36a";
	ctx.beginPath();
	ctx.ellipse(cx, cy + 30, 55, 45, 0, 0, Math.PI * 2);
	ctx.fill();

	/* head */
	const headY = cy - bodyR - headR + 20;
	ctx.fillStyle = "#8b5a2b";
	ctx.beginPath();
	ctx.arc(cx, headY, headR, 0, Math.PI * 2);
	ctx.fill();

	/* ears */
	ctx.beginPath();
	ctx.arc(cx - 55, headY - 50, 30, 0, Math.PI * 2);
	ctx.arc(cx + 55, headY - 50, 30, 0, Math.PI * 2);
	ctx.fill();

	/* face */
	ctx.strokeStyle = "#3a1e0f";
	ctx.lineWidth = 3;

	ctx.beginPath();
	ctx.arc(cx - 18, headY - 5, 10, Math.PI * 0.15, Math.PI * 0.85);
	ctx.arc(cx + 18, headY - 5, 10, Math.PI * 0.15, Math.PI * 0.85);
	ctx.stroke();

	ctx.fillStyle = "#3a1e0f";
	ctx.beginPath();
	ctx.arc(cx, headY + 10, 8, 0, Math.PI * 2);
	ctx.fill();

	ctx.beginPath();
	ctx.arc(cx, headY + 18, 18, 0, Math.PI);
	ctx.stroke();

	/* blush */
	ctx.fillStyle = "rgba(255,140,160,0.4)";
	ctx.beginPath();
	ctx.arc(cx - 30, headY + 10, 14, 0, Math.PI * 2);
	ctx.arc(cx + 30, headY + 10, 14, 0, Math.PI * 2);
	ctx.fill();
}

function animate() {
	if (hug && progress < 1) progress += 0.015;
	if (!hug && progress > 0) progress -= 0.015;
	progress = Math.max(0, Math.min(1, progress));

	drawTeddy(progress);
	drawHearts();
	drawWhispers();

	requestAnimationFrame(animate);
}

animate();

canvas.addEventListener("click", () => {
	hug = !hug;
	if (hug) spawnHearts();
});
