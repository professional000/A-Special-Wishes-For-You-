
/* ======================================
   ROYAL DIGITAL HUB
   BAVANI PREMIUM BIRTHDAY SURPRISE
====================================== */

const CONFIG = {

  password: "04/12/2006",

  // 04 December 2026, 12 AM IST
  birthdayDate: Date.now() + 15000,
   

  feedbackURL: "https://formspree.io/f/xzepljrz",

  musicVolume: 0.35

};


/* ELEMENTS */

const startScreen =
document.getElementById("startScreen");

const countdownScreen =
document.getElementById("countdownScreen");

const passwordScreen =
document.getElementById("passwordScreen");

const birthdayScreen =
document.getElementById("birthdayScreen");

const feedbackScreen =
document.getElementById("feedbackScreen");

const music =
document.getElementById("backgroundMusic");

const musicButton =
document.getElementById("musicButton");


/* SCREEN NAVIGATION */

function showScreen(screen) {

  [
    startScreen,
    countdownScreen,
    passwordScreen,
    birthdayScreen,
    feedbackScreen
  ].forEach(item => {

    item.classList.add("hidden");

  });

  screen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

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


/* START BUTTON */

document.getElementById("startButton")
.addEventListener("click", async () => {

  showScreen(countdownScreen);

  await playMusic();

  updateCountdown();

  if (!countdownFinished) {

    countdownInterval = setInterval(
      updateCountdown,
      1000
    );

  }

});


/* COUNTDOWN */

let countdownInterval = null;

let countdownFinished = false;

function updateCountdown() {

  const now = Date.now();

  const difference =
  CONFIG.birthdayDate - now;

  if (difference <= 0) {

    countdownFinished = true;

    clearInterval(countdownInterval);

    document.getElementById("countdownStatus")
    .textContent = "Your special day is here! ❤️";

    showScreen(passwordScreen);

    return;

  }

  const days = Math.floor(
    difference / 86400000
  );

  const hours = Math.floor(
    (difference % 86400000) / 3600000
  );

  const minutes = Math.floor(
    (difference % 3600000) / 60000
  );

  const seconds = Math.floor(
    (difference % 60000) / 1000
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


/* PASSWORD */

document.getElementById("passwordForm")
.addEventListener("submit", async event => {

  event.preventDefault();

  const entered =
  document.getElementById("passwordInput")
  .value.trim();

  const error =
  document.getElementById("passwordError");

  if (entered !== CONFIG.password) {

    error.textContent =
    "Incorrect password! Try again ❤️";

    return;

  }

  error.textContent = "";

  showScreen(birthdayScreen);

});


/* ROSE SCRATCH EFFECT */

const rose =
document.getElementById("roseWrap");

const roseStage =
document.getElementById("roseStage");

const birthdayMessage =
document.getElementById("birthdayMessage");

const slashStatus =
document.getElementById("slashStatus");

const scratchTrail =
document.getElementById("scratchTrail");

let startX = 0;

let startY = 0;

let isDragging = false;

let roseOpened = false;

let scratchProgress = 0;


/* SPARKLE CREATION */

function createScratchSpark(x, y) {

  const star = document.createElement("span");

  star.className = "scratch-star";

  star.textContent =
  Math.random() > 0.5 ? "✨" : "✦";

  star.style.left = x + "px";

  star.style.top = y + "px";

  scratchTrail.appendChild(star);

  setTimeout(() => star.remove(), 750);

}


/* ROSE PETALS */

function createRosePetals() {

  const petals = [
    "🌹", "🌸", "🌺", "💮", "🌷", "✨"
  ];

  for (let i = 0; i < 35; i++) {

    const petal =
    document.createElement("span");

    petal.className = "flying-petal";

    petal.textContent =
    petals[Math.floor(Math.random() * petals.length)];

    petal.style.left =
    (45 + Math.random() * 15) + "vw";

    petal.style.top =
    (35 + Math.random() * 25) + "vh";

    petal.style.setProperty(
      "--x",
      (Math.random() - 0.5) * 550 + "px"
    );

    petal.style.setProperty(
      "--y",
      (-100 - Math.random() * 450) + "px"
    );

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 2000);

  }

}


/* GOLDEN EXPLOSION */

function createGoldenExplosion() {

  for (let i = 0; i < 45; i++) {

    const particle =
    document.createElement("span");

    particle.className = "gold-particle";

    particle.style.left = "50vw";

    particle.style.top = "45vh";

    particle.style.setProperty(
      "--x",
      (Math.random() - 0.5) * 500 + "px"
    );

    particle.style.setProperty(
      "--y",
      (Math.random() - 0.5) * 500 + "px"
    );

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1100);

  }

}


/* REVEAL BIRTHDAY */

function revealBirthday() {

  if (roseOpened) return;

  roseOpened = true;

  rose.classList.add("revealed");

  slashStatus.textContent =
  "A beautiful wish is waiting for you... ❤️";

  createRosePetals();

  createGoldenExplosion();

  setTimeout(() => {

    roseStage.classList.add("hidden");

    birthdayMessage.classList.remove("hidden");

    createRosePetals();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 850);

}


/* POINTER SWIPE */

rose.addEventListener("pointerdown", event => {

  if (roseOpened) return;

  startX = event.clientX;

  startY = event.clientY;

  isDragging = true;

  rose.setPointerCapture(event.pointerId);

});


rose.addEventListener("pointermove", event => {

  if (!isDragging || roseOpened) return;

  const rect = rose.getBoundingClientRect();

  const x = event.clientX - rect.left;

  const y = event.clientY - rect.top;

  createScratchSpark(x, y);

});


rose.addEventListener("pointerup", event => {

  if (!isDragging || roseOpened) return;

  isDragging = false;

  const distanceX =
  event.clientX - startX;

  const distanceY =
  Math.abs(event.clientY - startY);

  if (distanceX > 45 && distanceX > distanceY) {

    scratchProgress += distanceX;

    if (scratchProgress >= 70) {

      revealBirthday();

    }

  } else {

    slashStatus.textContent =
    "Swipe from left to right to open the rose ✨";

  }

});


rose.addEventListener("pointercancel", () => {

  isDragging = false;

});


/* KEYBOARD ACCESS */

rose.addEventListener("keydown", event => {

  if (
    event.key === "Enter" ||
    event.key === " "
  ) {

    event.preventDefault();

    revealBirthday();

  }

});


/* FEEDBACK PAGE */

document.getElementById("toFeedbackButton")
.addEventListener("click", () => {

  showScreen(feedbackScreen);

});


/* FEEDBACK SUBMISSION */

document.getElementById("feedbackForm")
.addEventListener("submit", async event => {

  event.preventDefault();

  const form = event.currentTarget;

  const button =
  document.getElementById("sendFeedbackButton");

  const status =
  document.getElementById("feedbackStatus");

  if (!form.reportValidity()) return;

  button.disabled = true;

  button.textContent = "Sending...";

  status.textContent = "";

  const data = new FormData(form);

  data.append(
    "website",
    "BAVANI Birthday Surprise"
  );

  data.append(
    "date",
    new Date().toLocaleString("en-IN")
  );

  try {

    const response = await fetch(
      CONFIG.feedbackURL,
      {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      }
    );

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

const floatingEffects =
document.getElementById("floatingEffects");

const emojis = [
  "❤️", "💛", "💖", "✨", "🌹",
  "💕", "🌸", "💗", "🦋"
];


/* EMOJI EXPLOSION ON TAP */

function explodeEmoji(x, y) {

  const particles = [
    "❤️", "💖", "✨", "🌟",
    "💕", "🌸", "💛", "🎉"
  ];

  for (let i = 0; i < 14; i++) {

    const particle =
    document.createElement("span");

    particle.className = "burst-particle";

    particle.textContent =
    particles[Math.floor(Math.random() * particles.length)];

    particle.style.left = x + "px";

    particle.style.top = y + "px";

    particle.style.setProperty(
      "--x",
      (Math.random() - 0.5) * 180 + "px"
    );

    particle.style.setProperty(
      "--y",
      (Math.random() - 0.5) * 180 + "px"
    );

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 900);

  }

}


/* CREATE FLOATING EMOJI */

function createFloatingEmoji() {

  const emoji =
  document.createElement("span");

  emoji.className = "float-emoji";

  emoji.textContent =
  emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left =
  Math.random() * 95 + "vw";

  emoji.style.fontSize =
  (18 + Math.random() * 17) + "px";

  emoji.style.animationDuration =
  (7 + Math.random() * 6) + "s";

  floatingEffects.appendChild(emoji);

  emoji.addEventListener("click", event => {

    event.stopPropagation();

    const rect = emoji.getBoundingClientRect();

    explodeEmoji(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );

    emoji.remove();

  });

  setTimeout(() => emoji.remove(), 14000);

}


/* GENERATE EMOJIS */

setInterval(createFloatingEmoji, 900);


/* INITIAL STATE */

showScreen(startScreen);
                  
