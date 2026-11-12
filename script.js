
/* =====================================
   ROYAL DIGITAL HUB
   BAVANI BIRTHDAY WEBSITE
===================================== */

const CONFIG = {
  password: "04/12/2006",

  // 04 December 2026, 12 AM IST
  birthdayDate: new Date("2026-12-03T18:30:00Z").getTime(),

  // Feedback endpoint
  feedbackURL: "https://formspree.io/f/xzepljrz",

  musicVolume: 0.35
};


/* ELEMENTS */

const passwordScreen = document.getElementById("passwordScreen");
const countdownScreen = document.getElementById("countdownScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const feedbackScreen = document.getElementById("feedbackScreen");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");


/* SCREEN NAVIGATION */

function showScreen(screen) {
  [
    passwordScreen,
    countdownScreen,
    birthdayScreen,
    feedbackScreen
  ].forEach(item => item.classList.add("hidden"));

  screen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* MUSIC */

music.volume = CONFIG.musicVolume;

async function playMusic() {
  try {
    await music.play();
    musicButton.textContent = "♫ Pause Music";
    musicButton.classList.add("playing");
  } catch (error) {
    musicButton.textContent = "♫ Tap to Play";
  }
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    musicButton.textContent = "♫ Play Music";
    musicButton.classList.remove("playing");
  }
});

music.addEventListener("ended", () => {
  musicButton.textContent = "♫ Play Music";
  musicButton.classList.remove("playing");
});


/* COUNTDOWN */

function updateCountdown() {

  const now = Date.now();
  const difference = CONFIG.birthdayDate - now;

  if (difference <= 0) {

    clearInterval(countdownInterval);

    showScreen(birthdayScreen);

    document.getElementById("countdownStatus").textContent =
      "Your special day is here! Happy Birthday!";

    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountdown, 1000);

/* PASSWORD */

document.getElementById("passwordForm")
.addEventListener("submit", async event => {

  event.preventDefault();

  const entered =
    document.getElementById("passwordInput").value.trim();

  const error =
    document.getElementById("passwordError");

  if (entered !== CONFIG.password) {
    error.textContent = "Incorrect password! Try again.";
    return;
  }

  error.textContent = "";

  showScreen(countdownScreen);

  // Music starts after the visitor's interaction.
  await playMusic();

  updateCountdown();
});





/* ROSE SWIPE */

const rose = document.getElementById("roseWrap");
const roseStage = document.getElementById("roseStage");
const birthdayMessage = document.getElementById("birthdayMessage");
const slashStatus = document.getElementById("slashStatus");

let startX = 0;
let startY = 0;
let isDragging = false;
let roseOpened = false;

function revealBirthday() {

  if (roseOpened) return;

  roseOpened = true;

  rose.classList.add("revealed");

  slashStatus.textContent = "Your special message is opening...";

  setTimeout(() => {
    roseStage.classList.add("hidden");
    birthdayMessage.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 650);
}

rose.addEventListener("pointerdown", event => {
  if (roseOpened) return;

  startX = event.clientX;
  startY = event.clientY;
  isDragging = true;

  rose.setPointerCapture(event.pointerId);
});

rose.addEventListener("pointerup", event => {

  if (!isDragging || roseOpened) return;

  isDragging = false;

  const distanceX = event.clientX - startX;
  const distanceY = Math.abs(event.clientY - startY);

  if (distanceX > 70 && distanceX > distanceY) {
    revealBirthday();
  } else {
    slashStatus.textContent =
      "Swipe further from left to right across the rose.";
  }
});

rose.addEventListener("pointercancel", () => {
  isDragging = false;
});

rose.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    revealBirthday();
  }
});


/* FEEDBACK PAGE */

document.getElementById("toFeedbackButton")
.addEventListener("click", () => {
  showScreen(feedbackScreen);
});


/* PRIVATE FEEDBACK SUBMISSION */

document.getElementById("feedbackForm")
.addEventListener("submit", async event => {

  event.preventDefault();

  const form = event.currentTarget;
  const button = document.getElementById("sendFeedbackButton");
  const status = document.getElementById("feedbackStatus");

  if (!form.reportValidity()) return;

  button.disabled = true;
  button.textContent = "Sending...";
  status.textContent = "";

  const data = new FormData(form);

  data.append("website", "BAVANI Birthday Surprise");
  data.append("date", new Date().toLocaleString("en-IN"));

  try {

    const response = await fetch(CONFIG.feedbackURL, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    status.textContent =
      "Thank you! Your feedback has been sent privately. ❤️";

    status.style.color = "#f2d27b";

    form.reset();

    button.textContent = "Feedback Sent ✓";

  } catch (error) {

    status.textContent =
      "Unable to send. Please check your internet and try again.";

    status.style.color = "#ff9999";

    button.disabled = false;
    button.textContent = "Send Feedback ➤";

  }

});


/* FLOATING EMOJI EFFECT */

const floatingEffects = document.getElementById("floatingEffects");

const emojis = ["❤️", "💛", "💖", "✨", "🌹", "💕"];

function createFloatingEmoji() {

  const emoji = document.createElement("span");

  emoji.className = "float-emoji";
  emoji.textContent = emojis[
    Math.floor(Math.random() * emojis.length)
  ];

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.fontSize = (15 + Math.random() * 17) + "px";
  emoji.style.animationDuration = (7 + Math.random() * 6) + "s";

  floatingEffects.appendChild(emoji);

  setTimeout(() => emoji.remove(), 14000);
}

setInterval(createFloatingEmoji, 1100);


/* INITIAL CHECK */

// Birthday has passed? Still show password first.
// After password entry, countdown immediately opens the birthday screen
// if the target date has already passed.
