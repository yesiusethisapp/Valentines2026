const pages = [
	{
		text: "Happiestttt Valentine's Day Kannammaa :)",
		image: "images/0.png",
	},
	{
		text: "From the moment you entered my life, everything felt softer and brighter.",
		image: "images/1.jpeg",
	},
	{
		text: "You have this warmth that makes even ordinary days feel extraordinary.",
		image: "images/2.jpg",
	},
	{
		text: "The way you smile stays with me longer than you know.",
		image: "images/3.jpg",
	},
	{
		text: "You are thoughtful, kind, and effortlessly beautiful in spirit.",
		image: "images/4.JPG",
	},
	{
		text: "Every memory with you feels like a page in my favorite story.",
		image: "images/5.jpeg",
	},
	{
		text: "You deserve to feel cherished, chosen, and deeply appreciated.",
		image: "images/6.jpeg",
	},
	{
		text: "If love had a face, it would look a lot like the way you care.",
		image: "images/7.gif",
	},
	{
		text: "Today and always, you are someone incredibly special to me.",
		image: "images/8.jpeg",
	},
	{
		text: "I promise to always protect you regardless of distance, health, and situation.",
		image: "images/9.jpeg",
	},
	{
		text: "To the greatest, most precious, and most important part of my life: I love you, my sweet Kannamma :) Happy Valentine's Day !!!",
		image: "images/10.jpeg",
	},
];

let currentPage = 0;

const pageText = document.getElementById("pageText");
const pageImage = document.getElementById("pageImage");
const pageNumber = document.getElementById("pageNumber");
const totalPages = document.getElementById("totalPages");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

totalPages.textContent = pages.length;

function updatePage() {
	pageText.style.opacity = 0;
	pageImage.style.opacity = 0;

	setTimeout(() => {
		pageText.textContent = pages[currentPage].text;
		pageImage.src = pages[currentPage].image;
		pageNumber.textContent = currentPage + 1;

		pageText.style.opacity = 1;
		pageImage.style.opacity = 1;
	}, 300);
}

prevBtn.addEventListener("click", () => {
	if (currentPage > 0) {
		currentPage--;
		updatePage();
	}
});

nextBtn.addEventListener("click", () => {
	if (currentPage < pages.length - 1) {
		currentPage++;
		updatePage();
	}
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowRight" && currentPage < pages.length - 1) {
		currentPage++;
		updatePage();
	}
	if (e.key === "ArrowLeft" && currentPage > 0) {
		currentPage--;
		updatePage();
	}
});

updatePage();

/* Attempt autoplay fix for browsers */
document.addEventListener(
	"click",
	function () {
		const music = document.getElementById("bgMusic");
		music.play();
	},
	{ once: true },
);
