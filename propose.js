const ring = document.getElementById("ring");
const modal = document.getElementById("proposal");
const nextBtn = document.getElementById("nextBtn");
const closeX = document.getElementById("closeX");
const music = document.getElementById("proposeMusic");
const proposalText = document.getElementById("proposalText");

let started = false;
let currentStage = 0;

// The 5 stages of the proposal
const stages = [
	"I've loved you since the moment we met.",
	"You are my best friend, my rock, and my soulmate.",
	"Life with you is a beautiful adventure I never want to end.",
	"Will you make me the happiest person alive?",
	"Will you always keep choosing me forever?",
	"Will you be my partner in crime, my love, and my everything? \n\nWill you be my valentine? 💍❤️",
];

// Function to generate background floating hearts
function createFloatingHeart() {
	const heart = document.createElement("div");
	heart.className = "floating-heart";
	heart.textContent = "💖";
	heart.style.left = Math.random() * 100 + "vw";
	heart.style.animationDuration = Math.random() * 3 + 3 + "s";
	document.body.appendChild(heart);
	setTimeout(() => heart.remove(), 6000);
}

// Generate background hearts periodically
setInterval(createFloatingHeart, 300);

// Typing Effect Function
function typeEffect(text, element, speed = 40) {
	element.textContent = "";
	let i = 0;
	function typing() {
		if (i < text.length) {
			element.textContent += text.charAt(i);
			i++;
			setTimeout(typing, speed);
		}
	}
	typing();
}

function showStage(stageIndex) {
	if (stageIndex < stages.length) {
		modal.classList.remove("hidden");
		typeEffect(stages[stageIndex], proposalText);

		// Change button text on the last stage
		if (stageIndex === stages.length - 1) {
			nextBtn.textContent = "YES! 💖💍";
		} else {
			nextBtn.textContent = "Next ✨";
		}
	} else {
		// Flamboyant Ending
		triggerCelebration();
	}
}

ring.addEventListener("click", () => {
	if (!started) {
		music.play();
		started = true;
	}
	currentStage = 0;
	showStage(currentStage);

	// Click Sparkles
	for (let i = 0; i < 20; i++) {
		const s = document.createElement("div");
		s.className = "sparkle";
		s.textContent = "✨";
		s.style.left = Math.random() * 100 + "vw";
		s.style.top = Math.random() * 100 + "vh";
		document.body.appendChild(s);
		setTimeout(() => s.remove(), 1800);
	}
});

nextBtn.addEventListener("click", () => {
	currentStage++;
	showStage(currentStage);
});

closeX.addEventListener("click", () => {
	modal.classList.add("hidden");
});

function triggerCelebration() {
	// Confetti explosion
	const emojis = ["💖", "✨", "💍", "🎉", "😊", "🥰", "👰", "🤵"];
	for (let i = 0; i < 80; i++) {
		const c = document.createElement("div");
		c.className = "confetti";
		c.textContent = emojis[Math.floor(Math.random() * emojis.length)];

		const angle = Math.random() * Math.PI * 2;
		const distance = Math.random() * 400 + 100;
		const x = Math.cos(angle) * distance + "px";
		const y = Math.sin(angle) * distance + "px";

		c.style.setProperty("--x", x);
		c.style.setProperty("--y", y);
		c.style.animation = `celebrate 1.5s ease-out forwards`;
		document.body.appendChild(c);
		setTimeout(() => c.remove(), 1500);
	}

	// Final flair
	proposalText.innerHTML =
		"<strong>WOOOHOOOOOOO YESSS!</strong> 🎉<br>My heart is yours forever, my sweet sweet sweet beautiful girl.";
	nextBtn.style.display = "none"; // Hide button
	closeX.style.display = "none"; // Hide 'X'

	// Close modal after celebration
	setTimeout(() => {
		modal.classList.add("hidden");
		// Reset for next time
		nextBtn.style.display = "inline-block";
		closeX.style.display = "block";
		nextBtn.textContent = "Continue ✨";
	}, 4000);
}
