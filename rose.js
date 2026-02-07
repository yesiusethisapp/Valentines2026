document.addEventListener("DOMContentLoaded", () => {
	const bouquetBtn = document.getElementById("bouquetBtn");
	const modal = document.getElementById("noteModal");
	const noteText = document.getElementById("noteText");
	const closeBtn = document.getElementById("closeNote");
	const music = document.getElementById("roseMusic");

	const notes = [
		"This petal is for every moment you made me smile without even trying.",
		"A petal for your kindness and the warmth you bring everywhere.",
		"This petal carries love I don’t always have words for.",
		"A reminder that you make my world softer and brighter.",
		"Every petal holds a reason why you are special to me.",
		"This petal is a piece of my heart, just for you.",
		"You are my sunshine on cloudy days.",
		"I love you <3",
	];

	let musicStarted = false;

	function createPetal() {
		const petal = document.createElement("div");
		petal.className = "petal";

		petal.style.left = Math.random() * 100 + "vw";
		petal.style.animationDuration = Math.random() * 4 + 12 + "s";
		petal.style.setProperty("--sway", `${Math.random() * 180 - 90}px`);
		petal.style.transform = `rotate(${Math.random() * 360}deg)`;

		petal.addEventListener("click", () => {
			if (!musicStarted) {
				music.play();
				musicStarted = true;
			}

			noteText.textContent = notes[Math.floor(Math.random() * notes.length)];
			modal.classList.remove("hidden");
			petal.remove();
		});

		document.body.appendChild(petal);
		setTimeout(() => petal.remove(), 12000);
	}

	closeBtn.addEventListener("click", () => {
		modal.classList.add("hidden");
	});

	setInterval(createPetal, 1100);

	bouquetBtn.addEventListener("click", () => {
		const flowers = [
			"🌹",
			"🌷",
			"🌸",
			"🌺",
			"💐",
			"🌹",
			"🌷",
			"🌸",
			"🌺",
			"🌹",
			"🌷",
			"🌸",
			"🌺",
		];

		for (let i = 0; i < 250; i++) {
			const flower = document.createElement("div");
			flower.className = "flower";
			flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

			const angle = Math.random() * Math.PI * 2;
			const distance = Math.random() * 750 + 80;

			flower.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
			flower.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
			flower.style.left = "40px";
			flower.style.bottom = "40px";

			document.body.appendChild(flower);
			setTimeout(() => flower.remove(), 1600);
		}
	});
});
