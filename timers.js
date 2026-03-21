/* ================= COUNTDOWN TIMERS ================= */

/*
   This script powers the two countdown timers:

   1. Graduation Ceremony  →  #graduation-timer
   2. Celebration Party    →  #party-timer

   Dates must match the event details in your HTML.
*/

function startTimer(dateString, elementId) {
    const target = new Date(dateString).getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            document.getElementById(elementId).innerHTML = "It's time!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById(elementId).innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

/* ===== Start Both Timers ===== */
startTimer("May 22, 2026 19:00:00", "graduation-timer");
startTimer("May 23, 2026 14:00:00", "party-timer");
