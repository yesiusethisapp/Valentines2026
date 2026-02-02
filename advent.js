const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeBtn");

const today = new Date();
const year = today.getFullYear();

const days = [
	{
		date: 7,
		emoji: "🌹",
		title: "Rose Day",
		text: "A rose for you, for every reason I smile when I think of you.",
	},
	{
		date: 8,
		emoji: "💍",
		title: "Propose Day",
		text: "I choose you today, tomorrow, and every day that follows.",
	},
	{
		date: 9,
		emoji: "🍫",
		title: "Chocolate Day",
		text: "Sweet like chocolate, comforting like home — that’s you to me.",
	},
	{
		date: 10,
		emoji: "🧸",
		title: "Teddy Day",
		text: "If I could, I’d give you a hug you could keep forever.",
	},
	{
		date: 11,
		emoji: "🤞",
		title: "Promise Day",
		text: "I promise to care, to listen, and to choose you with honesty and love.",
	},
	{
		date: 12,
		emoji: "🤗",
		title: "Hug Day",
		text: "This is a reminder that you are always safe with me.",
	},
	{
		date: 13,
		emoji: "💋",
		title: "Kiss Day",
		text: "Every kiss carries all the love I don’t always have words for.",
	},
	{
		date: 14,
		emoji: "❤️",
		title: "Valentine’s Day",
		text: "You are my Valentine — today and always.",
	},
];

days.forEach((day) => {
	const box = document.createElement("div");
	box.className = "day";

	const unlockDate = new Date(year, 1, day.date);

	if (today < unlockDate) {
		box.textContent = "🔒";
		box.classList.add("locked");
	} else {
		box.innerHTML = `<div class="emoji">${day.emoji}</div><div class="label">${day.title}</div>`;
		box.onclick = () => {
			modalText.innerHTML = `<strong>${day.title}</strong><br><br>${day.text}`;
			modal.classList.remove("hidden");
			box.classList.add("opened");
		};
	}

	calendar.appendChild(box);
});

closeBtn.onclick = () => modal.classList.add("hidden");
