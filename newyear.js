document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("newYearPopup");
    const enterBtn = document.getElementById("enterWebsite");

    if (!popup || !enterBtn) return;

    const countdownContent = document.getElementById("countdownContent");
    const newYearContent = document.getElementById("newYearContent");

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const countdownYear = document.getElementById("countdownYear");
    const newYearTitle = document.getElementById("newYearTitle");

    const today = new Date();  //methana add krnna Test krnna
    

    const month = today.getMonth() + 1;
    const day = today.getDate();

    let targetYear;

    if (month === 12) {

        targetYear = today.getFullYear() + 1;

    } else if (month === 1 && (day === 1 || day === 2)) {

        targetYear = today.getFullYear();

    } else {

        targetYear = today.getFullYear() + 1;

    }

    countdownYear.textContent = targetYear;
    newYearTitle.textContent = targetYear;

    const targetDate = new Date(`January 1, ${targetYear} 00:00:00`);

    function updateCountdown() {

    const now = new Date();

    const diff = targetDate - now;

    if (diff <= 0) {

        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        countdownContent.style.display = "none";
        newYearContent.style.display = "block";

        return;

    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

}
// Update timer every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Today's date (YYYY-MM-DD)
const todayKey = new Date().toISOString().split("T")[0];

const popupKey = `newYearPopupClosed-${todayKey}`;

const alreadyClosed = localStorage.getItem(popupKey);

if (
    (month === 12 && day >= 25) ||
    (month === 1 && day <= 2)
) {
    popup.style.display = "flex";
} else {
    popup.style.display = "none";
}
// Show correct content
if (month === 12) {

    countdownContent.style.display = "block";
    newYearContent.style.display = "none";

}

if (month === 1 && day <= 2) {

    countdownContent.style.display = "none";
    newYearContent.style.display = "block";

}

// Enter Website button
enterBtn.addEventListener("click", () => {

    // Gold Confetti
    confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
        colors: [
            "#FFD700",
            "#D4AF37",
            "#FFFFFF",
            "#F5E6A6"
        ]
    });
    
    // Remember that the popup was closed today
const todayKey = new Date().toISOString().split("T")[0];

const popupKey = `newYearPopupClosed-${todayKey}`;

localStorage.setItem(popupKey, "closed");

    popup.style.opacity = "0";
    popup.style.transition = "0.5s";

    setTimeout(() => {

        popup.style.display = "none";

    }, 500);

});

// End DOMContentLoaded
});