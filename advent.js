const calendar = document.getElementById("calendar");
const specialDayBox = document.getElementById("specialDay");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeBtn");

const today = new Date();
const year = today.getFullYear();
const currentMonth = 1; // February

// --- SPECIAL FEB 6 LOGIC ---
const specialDate = new Date(year, currentMonth, 6);
if (today >= specialDate) {
    specialDayBox.classList.remove("hidden");
    specialDayBox.onclick = () => {
        const longNote = `
            <strong>My Dearest,</strong><br><br>
            Happy Special Day! You bring so much joy into my life.<br><br>
            I want you to know how truly <strong>proud I am of you</strong> and everything you do. Watching you grow and shine is my favorite thing.<br><br>
            Here's to us, today and always! ❤️
        `;
        openModal(longNote, specialDayBox);
    };
}
// ---------------------------

const days = [
    { date: 7, emoji: "🌹", title: "Rose Day", link: "rose.html" },
    { date: 8, emoji: "💍", title: "Propose Day", link: "propose.html" },
    { date: 9, emoji: "🍫", title: "Chocolate Day", link: "chocolate.html" },
    { date: 10, emoji: "🧸", title: "Teddy Day", link: "teddy.html" },
    { date: 11, emoji: "🤞", title: "Promise Day", link: "promise.html" },
    { date: 12, emoji: "🤗", title: "Hug Day", link: "hug.html" },
    { date: 13, emoji: "💋", title: "Kiss Day", link: "kiss.html" },
    { date: 14, emoji: "❤️", title: "Valentine’s Day", link: "valentine.html" },
];

days.forEach((day) => {
    const box = document.createElement("div");
    box.className = "day";

    const unlockDate = new Date(year, currentMonth, day.date);

    if (today < unlockDate) {
        box.textContent = "🔒";
        box.classList.add("locked");
    } else {
        box.innerHTML = `<div class="emoji">${day.emoji}</div><div class="label">${day.title}</div>`;
        box.onclick = () => {
            box.classList.add("opened");
            openModal(`<strong>${day.title}</strong><br><br>Opening your surprise...<br>Redirecting in 5 seconds!`, box, day.link);
        };
    }

    calendar.appendChild(box);
});

// Helper function to handle opening modal, animations, and flowers
function openModal(text, element, link = null) {
    modalText.innerHTML = text;
    modal.classList.remove("hidden");
    
    // Trigger animations
    void modal.offsetWidth; // Force reflow
    modal.classList.add("show");
    element.classList.add("explode");
    
    // Create falling flowers
    createFallingFlowers();
    
    // Remove animation class after it finishes
    setTimeout(() => {
        element.classList.remove("explode");
    }, 600);

    // If a link is provided, redirect after 5 seconds
    if (link) {
        setTimeout(() => {
            window.location.href = link;
        }, 5000);
    }
}

// Function to create falling flowers
function createFallingFlowers() {
    const flowers = ['🌹', '🌸', '💖', '❤️'];
    
    // Create flowers over 5 seconds
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + 'vw';
            // Slowed down animation speed
            flower.style.animationDuration = Math.random() * 3 + 4 + 's'; 
            document.body.appendChild(flower);
            
            // Remove flower after animation ends
            setTimeout(() => {
                flower.remove();
            }, 7000);
        }, i * 100);
    }
}

closeBtn.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
};
