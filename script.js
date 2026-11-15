/* =====================================
   ROYAL DIGITAL HUB
   BAVANI.S BIRTHDAY WEBSITE
   OPTIMIZED JAVASCRIPT
===================================== */

"use strict";

/* CONFIGURATION */

const CONFIG = Object.freeze({

    birthday: new Date("2026-12-04T00:00:00+05:30"),

    password: "04/12/2006",

    // false = Real countdown
    // true = Testing mode
    previewMode: false,

    typingSpeed: 32,

    floatingEmojiInterval: 1800,

    maxFloatingEmojis: 7

});


const $ = id => document.getElementById(id);

const pages = [...document.querySelectorAll(".page")];

const music = $("music");

const video = $("birthdayVideo");

let typingStarted = false;

let giftOpened = false;

let floatingTimer = null;

let lastEffectAt = 0;


/* =====================================
   PAGE NAVIGATION
===================================== */

function showPage(number) {

    const target = $("page" + number);

    if (!target) return;

    pages.forEach(page => {

        page.classList.toggle("active", page === target);

        page.setAttribute(
            "aria-hidden",
            page === target ? "false" : "true"
        );

    });

    if (number !== 5 && video && !video.paused) {
        video.pause();
    }

    if (number === 4) startTyping();

    if (number === 5) prepareBirthdayVideo();

    if (number === 2) updateCountdown();

}


/* =====================================
   START SURPRISE
===================================== */

function startSurprise() {

    music.play()
        .then(updateMusicButton)
        .catch(updateMusicButton);

    showPage(2);

    updateCountdown();

}


/* =====================================
   COUNTDOWN
===================================== */

function updateCountdown() {

    if (
        CONFIG.previewMode ||
        Date.now() >= CONFIG.birthday.getTime()
    ) {

        $("countMessage").textContent =
            "Your special moment is here ❤️";

        $("days").textContent = "00";

        $("hours").textContent = "00";

        $("minutes").textContent = "00";

        $("seconds").textContent = "00";

        showPage(3);

        return;

    }

    const remaining =
        CONFIG.birthday.getTime() - Date.now();

    const days =
        Math.floor(remaining / 86400000);

    const hours =
        Math.floor((remaining % 86400000) / 3600000);

    const minutes =
        Math.floor((remaining % 3600000) / 60000);

    const seconds =
        Math.floor((remaining % 60000) / 1000);


    $("days").textContent =
        String(days).padStart(2, "0");

    $("hours").textContent =
        String(hours).padStart(2, "0");

    $("minutes").textContent =
        String(minutes).padStart(2, "0");

    $("seconds").textContent =
        String(seconds).padStart(2, "0");

    $("countMessage").textContent =
        "Your surprise is waiting ❤️";

}


/* =====================================
   PASSWORD
===================================== */

function checkPassword(event) {

    event.preventDefault();

    const entered = $("password").value;

    if (entered === CONFIG.password) {

        $("passwordError").textContent = "";

        $("password").value = "";

        showPage(4);

    } else {

        $("passwordError").textContent =
            "Wrong password! Try again ❤️";

        $("password").value = "";

        $("password").focus();

    }

}


/* =====================================
   BIRTHDAY TYPING MESSAGE
===================================== */

const birthdayMessage = `On your special day, I wish you endless happiness, beautiful memories and countless reasons to smile.

May every dream you carry in your heart come true.

உன் வாழ்க்கையில் எப்போதும் மகிழ்ச்சி நிறைந்திருக்கட்டும்.

ஒவ்வொரு நாளும் புதிய நம்பிக்கையும் அழகான நினைவுகளும் உன்னைத் தேடி வரட்டும்.

Keep smiling, keep shining and always be happy.

You deserve all the beautiful things in life.

Once again, Happy Birthday BAVANI.S! ❤️✨`;


function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    const output = $("typedText");

    const nextButton = $("wishNext");

    let index = 0;

    function typeNext() {

        if (!$("page4").classList.contains("active")) {
            return;
        }

        if (index < birthdayMessage.length) {

            output.textContent +=
                birthdayMessage.charAt(index++);

            window.setTimeout(
                typeNext,
                CONFIG.typingSpeed
            );

        } else {

            nextButton.classList.remove("hidden");

        }

    }

    typeNext();

}


/* =====================================
   VIDEO PLAYER
===================================== */

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
            "Video could not start. Check 219015.mp4 in your GitHub root folder.";

        console.warn("Video playback failed:", error);

    }

}


function enableVideoSound() {

    playMyVideo(true);

}


function goToGift() {

    video.pause();

    showPage(6);

}


video.addEventListener("error", () => {

    const code = video.error ? video.error.code : 0;

    const messages = {

        2: "Network error while loading video.",

        3: "Unsupported video format. Use MP4 (H.264 + AAC).",

        4: "Video file not found. Check 219015.mp4 filename."

    };

    $("videoError").textContent =
        messages[code] ||
        "Unable to load video. Check filename, path and format.";

});


video.addEventListener("playing", () => {

    $("videoError").textContent = "";

});


video.addEventListener("waiting", () => {

    $("videoError").textContent = "Loading video…";

});


/* =====================================
   GIFT BOX
===================================== */

function openGift() {

    if (giftOpened) return;

    giftOpened = true;

    const gift = $("giftBox");

    gift.disabled = true;

    gift.style.transform =
        "scale(1.35) rotate(12deg)";

    window.setTimeout(() => {

        gift.classList.add("hidden");

        $("giftHint").textContent =
            "A special memory, just for you ❤️";

        $("photoReveal").style.display = "block";

        $("photoText").classList.remove("hidden");

        $("photoNext").classList.remove("hidden");

        createBurst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

    }, 420);

}


/* =====================================
   FLOATING EMOJIS
===================================== */

const emojiList = [
    "❤️", "💕", "💗", "💖",
    "🌹", "🦋", "✨", "💝",
    "🌸", "💫"
];


function createFloatingEmoji() {

    if (document.hidden) return;

    if (
        document.querySelectorAll(".floating-emoji").length >=
        CONFIG.maxFloatingEmojis
    ) return;

    const emoji = document.createElement("span");

    emoji.className = "floating-emoji";

    emoji.textContent =
        emojiList[
            Math.floor(Math.random() * emojiList.length)
        ];

    emoji.style.left =
        Math.random() * 94 + "vw";

    emoji.style.fontSize =
        (18 + Math.random() * 12) + "px";

    emoji.style.animationDuration =
        (7 + Math.random() * 3) + "s";

    $("particles").appendChild(emoji);

    window.setTimeout(() => emoji.remove(), 10500);

}


/* =====================================
   HEART BURST
===================================== */

function createBurst(x, y) {

    const effects = [
        "❤️", "💕", "✨", "💗",
        "🌹", "💖", "🦋"
    ];

    for (let i = 0; i < 8; i++) {

        const item = document.createElement("span");

        item.className = "burst";

        item.textContent =
            effects[
                Math.floor(Math.random() * effects.length)
            ];

        item.style.left = x + "px";

        item.style.top = y + "px";

        item.style.setProperty(
            "--x",
            (Math.random() * 150 - 75) + "px"
        );

        item.style.setProperty(
            "--y",
            (Math.random() * 150 - 75) + "px"
        );

        document.body.appendChild(item);

        window.setTimeout(() => item.remove(), 800);

    }

}


/* =====================================
   TAP SPARKLE
===================================== */

document.addEventListener("click", event => {

    const now = Date.now();

    if (now - lastEffectAt < 120) return;

    lastEffectAt = now;

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";

    sparkle.textContent = "✦";

    sparkle.style.left = event.clientX + "px";

    sparkle.style.top = event.clientY + "px";

    document.body.appendChild(sparkle);

    window.setTimeout(() => sparkle.remove(), 850);

});


/* =====================================
   BACKGROUND MUSIC
===================================== */

function updateMusicButton() {

    const isPlaying = !music.paused;

    $("musicBtn").textContent =
        isPlaying ? "♫ MUSIC ON" : "♫ MUSIC OFF";

    $("musicBtn").setAttribute(
        "aria-pressed",
        String(isPlaying)
    );

}


async function toggleMusic() {

    if (music.paused) {

        try {

            await music.play();

        } catch (error) {

            $("musicBtn").textContent = "♫ TAP AGAIN";

            console.warn("Music playback failed:", error);

        }

    } else {

        music.pause();

    }

    updateMusicButton();

}


music.addEventListener("play", updateMusicButton);

music.addEventListener("pause", updateMusicButton);

music.addEventListener("error", () => {

    $("musicBtn").textContent =
        "♫ MUSIC UNAVAILABLE";

});


/* =====================================
   FORMSPREE FEEDBACK
===================================== */

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

            headers: {
                Accept: "application/json"
            }

        });

        if (response.ok) {

            form.classList.add("hidden");

            $("thankYou").classList.remove("hidden");

            status.textContent =
                "Response sent successfully ❤️";

        } else {

            status.textContent =
                "Unable to send your response. Please try again.";

            button.disabled = false;

            button.textContent = "TRY AGAIN ❤️";

        }

    } catch (error) {

        status.textContent =
            "Internet connection error. Please try again.";

        button.disabled = false;

        button.textContent = "TRY AGAIN ❤️";

    }

}


/* =====================================
   EVENT CONNECTIONS
===================================== */

$("startBtn").addEventListener(
    "click",
    startSurprise
);

$("passwordForm").addEventListener(
    "submit",
    checkPassword
);

$("wishNext").addEventListener(
    "click",
    () => showPage(5)
);

$("playVideoBtn").addEventListener(
    "click",
    () => playMyVideo(false)
);

$("soundVideoBtn").addEventListener(
    "click",
    enableVideoSound
);

$("nextGiftBtn").addEventListener(
    "click",
    goToGift
);

$("giftBox").addEventListener(
    "click",
    openGift
);

$("photoNext").addEventListener(
    "click",
    () => showPage(7)
);

$("musicBtn").addEventListener(
    "click",
    toggleMusic
);

$("feedbackForm").addEventListener(
    "submit",
    submitFeedback
);


/* =====================================
   COUNTDOWN TIMER
===================================== */

window.setInterval(() => {

    if ($("page2").classList.contains("active")) {

        updateCountdown();

    }

}, 1000);


/* =====================================
   VISIBILITY OPTIMIZATION
===================================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        if (floatingTimer) {

            window.clearInterval(floatingTimer);

            floatingTimer = null;

        }

    } else if (!floatingTimer) {

        floatingTimer = window.setInterval(
            createFloatingEmoji,
            CONFIG.floatingEmojiInterval
        );

        if ($("page2").classList.contains("active")) {

            updateCountdown();

        }

    }

});


/* =====================================
   INITIALIZATION
===================================== */

floatingTimer = window.setInterval(
    createFloatingEmoji,
    CONFIG.floatingEmojiInterval
);

updateMusicButton();

pages.forEach(page => {

    page.setAttribute(
        "aria-hidden",
        page.classList.contains("active") ? "false" : "true"
    );

});
            
