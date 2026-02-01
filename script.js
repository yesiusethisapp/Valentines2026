const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const buttons = document.getElementById("buttons");
const question = document.getElementById("question");
const music = document.getElementById("music");

let yesScale = 1;
let noScale = 1;

// Yes button click
yesBtn.addEventListener("click", () => {
	question.textContent = "You said YES!!! 💘";
	message.textContent =
		"Darling, thank you for saying yes and choosing me. I am overflowing with gratitude, hope, and love for you and all the joy you bring into my life — from quiet late-night chats to the laughter we share. You bring passion and tenderness like no one else, and I am endlessly grateful for our bond built on trust, closeness, and understanding. You have given me so much happiness over the years, and I want to return that joy, support your dreams, and walk beside you through every season of life. I want to be the person you think of when you see fireworks, kites in the wind, flowers blooming, or imagine a future full of warmth and laughter. I want to give you comfort, security, peace, and love that is gentle, constant, and true. I believe in us, our growth, our trust, and the love we choose every day. You are my person, and I am so excited for all the memories, laughter, and love still ahead. Thank you for being my Valentine — for choosing us — and for making me the happiest, luckiest person. 💗\nHappy Valentine’s Day 🌹";
	message.classList.remove("hidden");
	buttons.remove();
	music.play();

	setInterval(createHeart, 250);
});

// No button click
noBtn.addEventListener("click", (e) => {
	e.preventDefault();

	yesScale += 0.1;
	noScale -= 0.2;

	yesBtn.style.transform = `scale(${yesScale})`;
	noBtn.style.transform = `scale(${Math.max(noScale, 0.3)})`;
});

// No button hover: shrink + random move
noBtn.addEventListener("mouseenter", () => {
	const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
	const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

	noScale -= 0.2; // shrink a bit on hover
	noBtn.style.transform = `scale(${Math.max(noScale, 0.3)})`;

	noBtn.style.position = "absolute";
	noBtn.style.left = x + "px";
	noBtn.style.top = y + "px";
});

// Floating hearts
function createHeart() {
	const heart = document.createElement("div");
	heart.className = "heart";
	heart.textContent = "💖";
	heart.style.left = Math.random() * 100 + "vw";
	heart.style.bottom = "-20px";
	document.body.appendChild(heart);

	setTimeout(() => heart.remove(), 4000);
}

// Parallax background
const layers = document.querySelectorAll(".layer");
window.addEventListener("mousemove", (e) => {
	const x = (e.clientX / window.innerWidth - 0.5) * 20;
	const y = (e.clientY / window.innerHeight - 0.5) * 20;

	layers.forEach((layer, i) => {
		const depth = (i + 1) * 0.4;
		layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
	});
});
