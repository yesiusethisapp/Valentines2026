const chocolates = document.querySelectorAll(".chocolate");
const modal = document.getElementById("messageModal");
const messageText = document.getElementById("messageText");
const closeBtn = document.getElementById("close");
const sound = document.getElementById("chocoSound");
const floatingBars = document.querySelector(".floating-bars");

/* Floating bars + emoji mix */
for (let i = 0; i < 24; i++) {
	let el;

	if (Math.random() > 0.5) {
		el = document.createElement("div");
		el.className = "bar";
	} else {
		el = document.createElement("div");
		el.className = "emoji-bar";
		el.textContent = "🍫";
	}

	el.style.left = Math.random() * 100 + "vw";
	el.style.animationDuration = 12 + Math.random() * 14 + "s";
	el.style.animationDelay = Math.random() * -20 + "s";
	el.style.transform = `scale(${Math.random() * 0.6 + 0.6})`;

	floatingBars.appendChild(el);
}

/* Chocolate interactions */
chocolates.forEach((choco, index) => {
	choco.style.animationDelay = `${index * 0.15}s`;

	choco.addEventListener("click", () => {
		sound.currentTime = 0;
		sound.play();

		choco.classList.add("clicked");

		setTimeout(() => {
			messageText.textContent = choco.dataset.message;
			modal.style.display = "flex";
		}, 350);
	});
});

closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
	if (e.target === modal) modal.style.display = "none";
};
