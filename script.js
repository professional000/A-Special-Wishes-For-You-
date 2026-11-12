
/* ==========================================
   ROYAL DIGITAL HUB
   BAVANI BIRTHDAY SURPRISE
========================================== */

const CONFIG = {

  // PASSWORD
  password: "BAVANI2026",

  // TEST MODE
  // true = 30 seconds countdown for testing
  // false = actual birthday countdown

  testMode: true,

  testCountdownSeconds: 30,

  // 04 December 2026, 12:00 AM IST
  // Equivalent UTC time: 03 December 2026, 18:30

  birthdayTimestamp:
    new Date("2026-12-03T18:30:00Z").getTime(),

  // Formspree feedback endpoint
  formspreeEndpoint:
    "https://formspree.io/f/xzepljrz"

};


// GET HTML ELEMENTS

const $ = (id) => document.getElementById(id);

const screens = [
  "passwordScreen",
  "countdownScreen",
  "birthdayScreen",
  "feedbackScreen"
];

let countdownInterval = null;
let targetTimestamp = null;
let roseRevealed = false;
let pointerStart = null;


// SCREEN NAVIGATION

function showScreen(id) {

  screens.forEach(screenId => {

    $(screenId).classList.toggle(
      "hidden",
      screenId !== id
    );

  });

}


// FORMAT COUNTDOWN NUMBERS

function formatTime(value) {

  return String(value).padStart(2, "0");

}


// COUNTDOWN FUNCTION

function startCountdown() {

  showScreen("countdownScreen");

  if (CONFIG.testMode) {

    targetTimestamp =
      Date.now() +
      CONFIG.testCountdownSeconds * 1000;

  } else {

    targetTimestamp =
      CONFIG.birthdayTimestamp;

  }

  $("testModeNotice").classList.toggle(
    "hidden",
    !CONFIG.testMode
  );

  if (countdownInterval) {

    clearInterval(countdownInterval);

  }


  function updateCountdown() {

    const remaining = Math.max(
      0,
      targetTimestamp - Date.now()
    );

    const totalSeconds =
      Math.floor(remaining / 1000);

    const days =
      Math.floor(totalSeconds / 86400);

    const hours =
      Math.floor((totalSeconds % 86400) / 3600);

    const minutes =
      Math.floor((totalSeconds % 3600) / 60);

    const seconds =
      totalSeconds % 60;


    $("days").textContent =
      formatTime(days);

    $("hours").textContent =
      formatTime(hours);

    $("minutes").textContent =
      formatTime(minutes);

    $("seconds").textContent =
      formatTime(seconds);


    // COUNTDOWN FINISHED

    if (remaining <= 0) {

      clearInterval(countdownInterval);

      countdownInterval = null;

      $("countdownStatus").textContent =
        "Your special birthday surprise is ready!";

      showBirthdayScreen();

    }

  }


  updateCountdown();

  countdownInterval =
    setInterval(updateCountdown, 1000);

}


// BIRTHDAY SCREEN

function showBirthdayScreen() {

  showScreen("birthdayScreen");

  $("roseStage").classList.remove("hidden");

  $("birthdayMessage").classList.add("hidden");

  $("roseWrap").classList.remove("slashing");

  $("slashStatus").textContent =
    "Touch and swipe from left to right across the rose.";

  roseRevealed = false;

}


// ROSE SLASH EFFECT

function revealBirthdayMessage() {

  if (roseRevealed) return;

  roseRevealed = true;

  $("roseWrap").classList.add("slashing");

  $("slashStatus").textContent =
    "Your birthday wish is opening…";


  setTimeout(() => {

    $("roseStage").classList.add("hidden");

    $("birthdayMessage").classList.remove("hidden");

  }, 480);

}


// ROSE SWIPE START

function handleRosePointerDown(event) {

  if (roseRevealed) return;

  pointerStart = {

    x: event.clientX,

    y: event.clientY

  };

}


// ROSE SWIPE END

function handleRosePointerUp(event) {

  if (roseRevealed || !pointerStart) return;

  const dx =
    event.clientX - pointerStart.x;

  const dy =
    Math.abs(event.clientY - pointerStart.y);

  pointerStart = null;


  // Horizontal swipe required

  if (
    dx > 45 &&
    Math.abs(dx) > dy * 1.15
  ) {

    revealBirthdayMessage();

  }

}


// KEYBOARD SUPPORT

function handleRoseKeyboard(event) {

  if (
    event.key === "Enter" ||
    event.key === " "
  ) {

    event.preventDefault();

    revealBirthdayMessage();

  }

}


// PASSWORD SUBMISSION

$("passwordForm").addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    const enteredPassword =
      $("passwordInput").value.trim();


    if (enteredPassword === CONFIG.password) {

      $("passwordError").textContent = "";

      $("passwordInput").value = "";

      startCountdown();

    } else {

      $("passwordError").textContent =
        "Incorrect password. Please try again.";

      $("passwordInput").focus();

    }

  }
);


// ROSE EVENTS

$("roseWrap").addEventListener(
  "pointerdown",
  handleRosePointerDown
);

$("roseWrap").addEventListener(
  "pointerup",
  handleRosePointerUp
);

$("roseWrap").addEventListener(
  "pointercancel",
  () => {

    pointerStart = null;

  }
);

$("roseWrap").addEventListener(
  "keydown",
  handleRoseKeyboard
);


// GO TO FEEDBACK PAGE

$("toFeedbackButton").addEventListener(
  "click",
  () => {

    showScreen("feedbackScreen");

  }
);


// PRIVATE FEEDBACK SUBMISSION

$("feedbackForm").addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const message =
      $("feedbackMessage").value.trim();


    if (!message) {

      $("feedbackStatus").textContent =
        "Please write your feedback before sending.";

      return;

    }


    const button =
      $("sendFeedbackButton");

    const originalButtonText =
      button.innerHTML;

    button.disabled = true;

    button.textContent = "Sending…";

    $("feedbackStatus").textContent = "";


    const formData =
      new FormData($("feedbackForm"));

    formData.append(
      "_subject",
      "BAVANI Birthday Website - Private Feedback"
    );

    formData.append(
      "website",
      "BAVANI Birthday Surprise"
    );


    try {

      const response = await fetch(
        CONFIG.formspreeEndpoint,
        {

          method: "POST",

          body: formData,

          headers: {
            "Accept": "application/json"
          }

        }
      );


      if (response.ok) {

        $("feedbackStatus").textContent =
          "Thank you! Your feedback has been sent privately. ❤️";

        $("feedbackForm").reset();

      } else {

        $("feedbackStatus").textContent =
          "Feedback could not be sent. Please check the Formspree setup.";

      }

    } catch (error) {

      $("feedbackStatus").textContent =
        "Network error. Please check your internet and try again.";

    } finally {

      button.disabled = false;

      button.innerHTML = originalButtonText;

    }

  }
);


/* =================================
   FLOATING EMOJI GENERATOR
================================= */

const floatingEmojis = [
  "❤️",
  "💖",
  "💕",
  "💛",
  "✨",
  "🌹",
  "💗",
  "💝"
];

const floatingContainer =
  document.getElementById("floatingEffects");

function createFloatingEmoji() {

  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    return;
  }

  const emoji = document.createElement("span");

  emoji.className = "floating-emoji";

  emoji.textContent =
    floatingEmojis[
      Math.floor(Math.random() * floatingEmojis.length)
    ];

  const left = Math.random() * 95;
  const size = 16 + Math.random() * 18;
  const duration = 6 + Math.random() * 5;

  emoji.style.setProperty(
    "--left",
    left + "%"
  );

  emoji.style.setProperty(
    "--size",
    size + "px"
  );

  emoji.style.setProperty(
    "--duration",
    duration + "s"
  );

  floatingContainer.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, duration * 1000);
}

// Create one emoji every 650 milliseconds

setInterval(createFloatingEmoji, 650);
