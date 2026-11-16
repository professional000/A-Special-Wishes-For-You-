
/* BAVANI.S — ROYAL GOLD BIRTHDAY SURPRISE */

"use strict";

/* SETTINGS */
const CONFIG = Object.freeze({
  birthday: new Date(Date.now() + 30000),
  password: "BAVANI123",
  typingSpeed: 32,
  dustInterval: 180,
  floatingEmojiInterval: 1800,
  maxFloatingEmojis: 7
});

const $ = (id) => document.getElementById(id);
const pages = [...document.querySelectorAll(".page")];
const music = $("music");
const video = $("birthdayVideo");

let typingStarted = false;
let giftOpened = false;
let dustTimer = null;
let floatingTimer = null;
let lastSparkleAt = 0;

const birthdayMessage = `On your special day, I wish you endless happiness, beautiful memories and countless reasons to smile.

May every dream you carry in your heart come true.

உன் வாழ்க்கையில் எப்போதும் மகிழ்ச்சி நிறைந்திருக்கட்டும்.

ஒவ்வொரு நாளும் புதிய நம்பிக்கையும் அழகான நினைவுகளும் உன்னைத் தேடி வரட்டும்.

Keep smiling, keep shining and always be happy.

You deserve all the beautiful things in life.

Once again, Happy Birthday BAVANI.S! ❤️✨`;

/* PAGE NAVIGATION */
function showPage(number) {
  const target = $("page" + number);
  if (!target) return;

  pages.forEach((page) => {
    const active = page === target;
    page.classList.toggle("active", active);
    page.setAttribute("aria-hidden", String(!active));
  });

  if (number !== 5 && video && !video.paused) video.pause();
  if (number === 4) startTyping();
  if (number === 5) prepareBirthdayVideo();
  if (number === 2) updateCountdown();
}

/* START */
async function startSurprise() {
  try {
    await music.play();
  } catch (error) {
    // Music is optional; browser autoplay restrictions are normal.
  }
  updateMusicButton();
  showPage(2);
}

/* COUNTDOWN */
function updateCountdown() {
  const remaining = CONFIG.birthday.getTime() - Date.now();

  if (remaining <= 0) {
    $("days").textContent = "00";
    $("hours").textContent = "00";
    $("minutes").textContent = "00";
    $("seconds").textContent = "00";
    $("countMessage").textContent = "Your special moment is here ❤️";
    if ($("page2").classList.contains("active")) {
      window.setTimeout(() => {
        if ($("page2").classList.contains("active")) showPage(3);
      }, 900);
    }
    return;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  $("days").textContent = String(days).padStart(2, "0");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
  $("countMessage").textContent = "Your surprise is waiting ❤️";
}

/* PASSWORD */
function checkPassword(event) {
  event.preventDefault();
  const entered = $("password").value;

  if (entered === CONFIG.password) {
    $("passwordError").textContent = "";
    $("password").value = "";
    showPage(4);
  } else {
    $("passwordError").textContent = "Wrong password! Try again ❤️";
    $("password").value = "";
    $("password").focus();
  }
}

/* TYPEWRITER */
function startTyping() {
  if (typingStarted) return;
  typingStarted = true;

  const output = $("typedText");
  const nextButton = $("wishNext");
  let index = 0;

  function typeNext() {
    if (!$("page4").classList.contains("active")) return;

    if (index < birthdayMessage.length) {
      output.textContent += birthdayMessage.charAt(index++);
      window.setTimeout(typeNext, CONFIG.typingSpeed);
    } else {
      nextButton.classList.remove("hidden");
    }
  }
  typeNext();
}

/* VIDEO */
function prepareBirthdayVideo() {
  music.pause();
  updateMusicButton();
  $("videoError").textContent = "";
  video.pause();
  video.muted = true;
  video.load();
}

async function playMyVideo(withSound = false) {
  $("videoError").textContent = "";
  video.muted = !withSound;
  video.volume = 1;

  try {
    await video.play();
  } catch (error) {
    $("videoError").textContent =
      "Video could not start. Check that 219015.mp4 exists in your project root folder and is a supported MP4.";
  }
}

function goToGift() {
  video.pause();
  showPage(6);
}

video.addEventListener("error", () => {
  const code = video.error ? video.error.code : 0;
  const messages = {
    2: "Network error while loading video.",
    3: "Unsupported video encoding. Try MP4 (H.264 video + AAC audio).",
    4: "Video file not found. Check the filename 219015.mp4."
  };
  $("videoError").textContent = messages[code] || "Unable to load video. Check the file path and format.";
});
video.addEventListener("playing", () => $("videoError").textContent = "");
video.addEventListener("waiting", () => $("videoError").textContent = "Loading video…");

/* GIFT + GOLDEN BURST */
function openGift() {
  if (giftOpened) return;
  giftOpened = true;

  const gift = $("giftBox");
  gift.disabled = true;
  gift.style.transform = "scale(1.35) rotate(12deg)";

  window.setTimeout(() => {
    gift.classList.add("hidden");
    $("giftHint").textContent = "A special memory, just for you ❤️";
    $("photoReveal").style.display = "block";
    $("photoText").classList.remove("hidden");
    $("photoNext").classList.remove("hidden");
    createGoldenBurst(window.innerWidth / 2, window.innerHeight / 2);
  }, 420);
}

$("photoReveal").addEventListener("error", () => {
  $("photoError").textContent = "Photo not found. Check that gift-photo.jpg is in your project root folder.";
});
$("photoReveal").addEventListener("load", () => {
  $("photoError").textContent = "";
});

/* GOLD PARTICLE RAIN */
function createGoldDust() {
  if (document.hidden) return;
  const layer = $("goldParticles");
  if (layer.childElementCount > 65) return;

  const dust = document.createElement("span");
  dust.className = "gold-dust";
  dust.style.left = Math.random() * 100 + "vw";
  const size = 1.5 + Math.random() * 3.5;
  dust.style.width = size + "px";
  dust.style.height = size + "px";
  dust.style.animationDuration = (5 + Math.random() * 6) + "s";
  layer.appendChild(dust);
  window.setTimeout(() => dust.remove(), 11500);
}

/* FLOATING HEARTS / GOLDEN EMOJIS */
const emojiList = ["✨", "💛", "❤️", "🌟", "🌹", "💫", "💕", "✦"];

function createFloatingEmoji() {
  if (document.hidden) return;
  const layer = $("floatingHearts");
  if (layer.childElementCount >= CONFIG.maxFloatingEmojis) return;

  const emoji = document.createElement("span");
  emoji.className = "floating-emoji";
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
  emoji.style.left = Math.random() * 94 + "vw";
  emoji.style.fontSize = (17 + Math.random() * 13) + "px";
  emoji.style.animationDuration = (7 + Math.random() * 3) + "s";
  layer.appendChild(emoji);
  window.setTimeout(() => emoji.remove(), 10500);
}

/* GOLDEN GIFT BURST */
function createGoldenBurst(x, y) {
  const effects = ["✨", "💛", "🌟", "✦", "💫", "🌹", "❤️"];
  for (let i = 0; i < 24; i++) {
    const item = document.createElement("span");
    item.className = "burst";
    item.textContent = effects[Math.floor(Math.random() * effects.length)];
    item.style.left = x + "px";
    item.style.top = y + "px";
    item.style.setProperty("--x", (Math.random() * 260 - 130) + "px");
    item.style.setProperty("--y", (Math.random() * 260 - 130) + "px");
    document.body.appendChild(item);
    window.setTimeout(() => item.remove(), 950);
  }
}

/* TAP SPARKLE */
document.addEventListener("click", (event) => {
  const now = Date.now();
  if (now - lastSparkleAt < 100) return;
  lastSparkleAt = now;

  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = "✦";
  sparkle.style.left = event.clientX + "px";
  sparkle.style.top = event.clientY + "px";
  document.body.appendChild(sparkle);
  window.setTimeout(() => sparkle.remove(), 850);
});

/* BACKGROUND MUSIC */
function updateMusicButton() {
  const playing = !music.paused;
  $("musicBtn").textContent = playing ? "♫ MUSIC ON" : "♫ MUSIC OFF";
  $("musicBtn").setAttribute("aria-pressed", String(playing));
}

async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
    } catch (error) {
      $("musicBtn").textContent = "♫ TAP AGAIN";
      return;
    }
  } else {
    music.pause();
  }
  updateMusicButton();
}
music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);
music.addEventListener("error", () => {
  $("musicBtn").textContent = "♫ MUSIC UNAVAILABLE";
});

/* FEEDBACK FORM */
async function submitFeedback(event) {
  event.preventDefault();

  const form = $("feedbackForm");
  const button = $("submitBtn");
  const status = $("formStatus");

  if (!form.reportValidity()) return;

  button.disabled = true;
  button.textContent = "SENDING…";
  status.textContent = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      $("feedbackContent").classList.add("hidden");
      $("thankYou").classList.remove("hidden");
      status.textContent = "";
      createGoldenBurst(window.innerWidth / 2, window.innerHeight / 2);
    } else {
      status.textContent = "Unable to send your response. Please try again.";
      button.disabled = false;
      button.textContent = "TRY AGAIN ❤️";
    }
  } catch (error) {
    status.textContent = "Internet connection error. Please try again.";
    button.disabled = false;
    button.textContent = "TRY AGAIN ❤️";
  }
}

/* EVENTS */
$("startBtn").addEventListener("click", startSurprise);
$("passwordForm").addEventListener("submit", checkPassword);
$("wishNext").addEventListener("click", () => showPage(5));
$("playVideoBtn").addEventListener("click", () => playMyVideo(false));
$("soundVideoBtn").addEventListener("click", () => playMyVideo(true));
$("nextGiftBtn").addEventListener("click", goToGift);
$("giftBox").addEventListener("click", openGift);
$("photoNext").addEventListener("click", () => showPage(7));
$("musicBtn").addEventListener("click", toggleMusic);
$("feedbackForm").addEventListener("submit", submitFeedback);

/* TIMERS */
window.setInterval(() => {
  if ($("page2").classList.contains("active")) updateCountdown();
}, 1000);

function startBackgroundEffects() {
  if (!dustTimer) dustTimer = window.setInterval(createGoldDust, CONFIG.dustInterval);
  if (!floatingTimer) floatingTimer = window.setInterval(createFloatingEmoji, CONFIG.floatingEmojiInterval);
}

function stopBackgroundEffects() {
  if (dustTimer) {
    window.clearInterval(dustTimer);
    dustTimer = null;
  }
  if (floatingTimer) {
    window.clearInterval(floatingTimer);
    floatingTimer = null;
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopBackgroundEffects();
  else {
    startBackgroundEffects();
    if ($("page2").classList.contains("active")) updateCountdown();
  }
});

/* INITIALIZE — keep the welcome page visible on first load */
pages.forEach((page) => {
  page.setAttribute("aria-hidden", String(!page.classList.contains("active")));
});
updateMusicButton();
startBackgroundEffects();
