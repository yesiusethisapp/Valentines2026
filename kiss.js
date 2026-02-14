const kissSound = document.getElementById("kissSound");
const unlockMusic = document.getElementById("unlockMusic");
const kissCountEl = document.getElementById("kissCount");
const finalMessage = document.getElementById("finalMessage");

let kissCount = 0;
const requiredKisses = 20;

/* SVG lipstick stamp */
function createLipSVG() {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("viewBox", "0 0 100 70");
	svg.classList.add("lip");

	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", "M10 35 Q50 5 90 35 Q50 65 10 35 Z");
	path.setAttribute("fill", "#930221");

	svg.appendChild(path);
	return svg;
}

/* Click to place kiss */
document.body.addEventListener("click", (e) => {
	if (kissCount >= requiredKisses) return;

	kissSound.currentTime = 0;
	kissSound.play();

	const lip = createLipSVG();
	lip.style.left = e.clientX - 45 + "px";
	lip.style.top = e.clientY - 35 + "px";

	document.body.appendChild(lip);

	kissCount++;
	kissCountEl.textContent = kissCount;

	if (kissCount === requiredKisses) {
		unlockFinal();
	}
});

/* Unlock sequence */
function unlockFinal() {
	unlockMusic.play();
	finalMessage.classList.remove("hidden");

	const centerLip = createLipSVG();
	centerLip.classList.add("center-kiss");
	document.body.appendChild(centerLip);

	document.querySelector(".sparkle-overlay").style.opacity = "0.2";
}
