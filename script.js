const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const buttons = document.getElementById("buttons");
const question = document.getElementById("question");
const music = document.getElementById("music");
const adventBtn = document.getElementById("adventBtn");

let yesScale = 1;
let noScale = 1;

// Show advent button starting Feb 7
const today = new Date();
const unlockDate = new Date(today.getFullYear(), 1, 7);
if (today >= unlockDate) {
	adventBtn.classList.remove("hidden");
}

// Yes click
yesBtn.addEventListener("click", () => {
	question.textContent = "You said YES!!! 💘";
	message.textContent =
		"Darling, thank you for saying yes and choosing me. I am overflowing with gratitude, hope, and love for you and all the joy you bring into my life — from quiet late-night chats to the laughter we share. You bring passion and tenderness like no one else, and I am endlessly grateful for our bond built on trust, closeness, and understanding. You have given me so much happiness over the years, and I want to return that joy, support your dreams, and walk beside you through every season of life. I want to give you comfort, security, peace, and love that is gentle, constant, and true. I believe in us and the love we choose every day. You are my person, and I am so excited for everything ahead. Thank you for being my Valentine and making me the happiest person. 💗\nHappy Valentine’s Day 🌹";

	message.classList.remove("hidden");
	buttons.remove();
	music.play();

	setInterval(createHeart, 250);
});

// No click
noBtn.addEventListener("click", (e) => {
	e.preventDefault();
	yesScale += 0.1;
	noScale -= 0.2;
	yesBtn.style.transform = `scale(${yesScale})`;
	noBtn.style.transform = `scale(${Math.max(noScale, 0.3)})`;
});

// No hover
noBtn.addEventListener("mouseenter", () => {
	noScale -= 0.2;
	noBtn.style.transform = `scale(${Math.max(noScale, 0.3)})`;

	noBtn.style.position = "absolute";
	noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
	noBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
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

// Parallax
const layers = document.querySelectorAll(".layer");
window.addEventListener("mousemove", (e) => {
	const x = (e.clientX / window.innerWidth - 0.5) * 20;
	const y = (e.clientY / window.innerHeight - 0.5) * 20;
	layers.forEach((layer, i) => {
		const depth = (i + 1) * 0.4;
		layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
	});
});
