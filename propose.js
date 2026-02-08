const ring = document.getElementById("ring");
const modal = document.getElementById("proposal");
const closeBtn = document.getElementById("closeProposal");
const music = document.getElementById("proposeMusic");

let started = false;

ring.addEventListener("click", () => {
	if (!started) {
		music.play();
		started = true;
	}

	modal.classList.remove("hidden");

	for (let i = 0; i < 24; i++) {
		const s = document.createElement("div");
		s.className = "sparkle";
		s.textContent = "✨";
		s.style.left = Math.random() * 100 + "vw";
		s.style.top = Math.random() * 100 + "vh";
		document.body.appendChild(s);
		setTimeout(() => s.remove(), 1800);
	}
});

closeBtn.addEventListener("click", () => {
	modal.classList.add("hidden");
});
