
/* =================================
   ROYAL DIGITAL HUB
   BAVANI BIRTHDAY SCRAPBOOK
================================= */

const CONFIG = {

  // Password - change here
  password: "BAVANI2026",

  // Birthday: 11 November 2026
  // Midnight in India (IST)
  birthdayDate: new Date(
    "2026-11-11T18:30:00Z"
  ).getTime()

};


/* =================================
   SCREEN ELEMENTS
================================= */

const countdownScreen =
  document.getElementById("countdownScreen");

const passwordScreen =
  document.getElementById("passwordScreen");

const scrapbookScreen =
  document.getElementById("scrapbookScreen");

const music =
  document.getElementById("backgroundMusic");


/* =================================
   COUNTDOWN SYSTEM
================================= */

function updateCountdown() {

  const now = Date.now();

  const difference =
    CONFIG.birthdayDate - now;

  if (difference <= 0) {

    countdownScreen.classList.add("hidden");

    passwordScreen.classList.remove("hidden");

    return;

  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =================================
   PASSWORD PROTECTION
================================= */

function checkPassword() {

  const enteredPassword =
    document.getElementById("passwordInput").value;

  const error =
    document.getElementById("passwordError");

  if (Date.now() < CONFIG.birthdayDate) {

    error.textContent =
      "This surprise is not available yet!";

    return;

  }

  if (enteredPassword === CONFIG.password) {

    passwordScreen.classList.add("hidden");

    scrapbookScreen.classList.remove("hidden");

    error.textContent = "";

    // Music starts after user interaction
    if (music) {
      music.volume = 0.35;
      music.play().catch(() => {});
    }

  } else {

    error.textContent =
      "Incorrect password! Try again.";

  }

}


// Enter key support
document.getElementById("passwordInput")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      checkPassword();
    }

  });


/* =================================
   SCRAPBOOK PAGE SYSTEM
================================= */

function hideAllPages() {

  document.querySelectorAll(".memory-page")
    .forEach(page => {
      page.classList.add("hidden");
    });

}

function startBook() {

  document.querySelector(".cover")
    .classList.add("hidden");

  hideAllPages();

  document.getElementById("page1")
    .classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function nextPage(currentPage) {

  const next = currentPage + 1;

  document.getElementById("page" + currentPage)
    .classList.add("hidden");

  document.getElementById("page" + next)
    .classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function restartBook() {

  hideAllPages();

  document.querySelector(".cover")
    .classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}
