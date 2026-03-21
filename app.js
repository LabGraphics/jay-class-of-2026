/* ================= RSVP FORM LOGIC ================= */

const rsvpForm = document.getElementById('rsvp-form');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('rsvp-name').value.trim();
        const status = document.getElementById('rsvp-status').value;

        if (!name || !status) {
            alert("Please complete all RSVP fields.");
            return;
        }

        alert(`Thank you, ${name}! Your RSVP (${status}) has been recorded.`);
        rsvpForm.reset();
    });
}


/* ================= WISH WALL LOGIC ================= */

const postWishBtn = document.getElementById('post-wish');
const wishInput = document.getElementById('wish-input');
const wishWall = document.getElementById('wish-wall');

if (postWishBtn) {
    postWishBtn.addEventListener('click', function () {
        const message = wishInput.value.trim();

        if (message === "") {
            alert("Please write a message before posting!");
            return;
        }

        // Create a new wish note
        const newWish = document.createElement('div');
        newWish.className = 'wish-note';
        newWish.innerText = `"${message}"`;

        // Add to top of wall
        wishWall.prepend(newWish);

        // Clear input
        wishInput.value = "";
    });
}
