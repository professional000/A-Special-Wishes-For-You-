
/* ==========================================
   ROYAL DIGITAL HUB
   BAVANI BIRTHDAY SCRAPBOOK
   CORRECTED WORKING JAVASCRIPT
========================================== */

const CONFIG = {
  password: "BAVANI2026",

  // 11 November 2026, 12:00 AM India Time
  birthdayDate: new Date("2026-11-11T18:30:00Z").getTime()
};


/* ==========================================
   ELEMENTS
========================================== */

let countdownScreen;
let passwordScreen;
let scrapbookScreen;
let music;


/* ==========================================
   INITIALIZE WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  countdownScreen = document.getElementById("countdownScreen");
  passwordScreen = document.getElementById("passwordScreen");
  scrapbookScreen = document.getElementById("scrapbookScreen");
  music = document.getElementById("backgroundMusic");

  if (!countdownScreen || !passwordScreen || !scrapbookScreen) {
    console.error("Website screen elements are missing.");
    return;
  }

  // Password button
  const passwordInput = document.getElementById("passwordInput");

  if (passwordInput) {
    passwordInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkPassword();
      }
    });
  }

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Make functions accessible to HTML onclick buttons
  window.checkPassword = checkPassword;
  window.startBook = startBook;
  window.nextPage = nextPage;
  window.restartBook = restartBook;

});


/* ==========================================
   COUNTDOWN
========================================== */

function updateCountdown() {

  const difference = CONFIG.birthdayDate - Date.now();

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

  setText("days", days);
  setText("hours", hours);
  setText("minutes", minutes);
  setText("seconds", seconds);
}

function setText(id, value) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = String(value).padStart(2, "0");
  }
}


/* ==========================================
   PASSWORD CHECK
========================================== */

function checkPassword() {

  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");

  if (!input || !error) return;

  if (Date.now() < CONFIG.birthdayDate) {

    error.textContent = "This surprise is not available yet!";
    return;
  }

  if (input.value.trim() === CONFIG.password) {

    passwordScreen.classList.add("hidden");
    scrapbookScreen.classList.remove("hidden");

    error.textContent = "";

    if (music) {
      music.volume = 0.35;

      const playPromise = music.play();

      if (playPromise !== undefined) {
        playPromise.catch(function () {
          console.log("Music playback requires user interaction.");
        });
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } else {

    error.textContent = "Incorrect password! Try again.";
    input.value = "";
    input.focus();

  }
}


/* ==========================================
   HIDE ALL MEMORY PAGES
========================================== */

function hideAllPages() {

  document.querySelectorAll(".memory-page").forEach(function (page) {

    page.classList.add("hidden");

  });

}


/* ==========================================
   OPEN SCRAPBOOK
========================================== */

function startBook() {

  const cover = document.querySelector(".cover");
  const firstPage = document.getElementById("page1");

  if (!cover || !firstPage) {
    console.error("Scrapbook cover or first page is missing.");
    return;
  }

  cover.classList.add("hidden");

  hideAllPages();

  firstPage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================
   NEXT MEMORY PAGE
========================================== */

function nextPage(currentPage) {

  currentPage = Number(currentPage);

  if (
    !Number.isInteger(currentPage) ||
    currentPage < 1 ||
    currentPage >= 6
  ) {
    return;
  }

  const current = document.getElementById("page" + currentPage);
  const next = document.getElementById("page" + (currentPage + 1));

  if (!current || !next) {
    console.error("Memory page not found.");
    return;
  }

  current.classList.add("hidden");

  next.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================
   READ AGAIN
========================================== */

function restartBook() {

  const cover = document.querySelector(".cover");

  if (!cover) return;

  hideAllPages();

  cover.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}
