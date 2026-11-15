
/* =================================
   CONFIGURATION
================================= */

const CONFIG = {

  birthday: new Date("2026-12-04T00:00:00+05:30"),

  password: "BAVANI123",

  // Testing only. Set false before publishing.
  previewMode: false,

  typingSpeed: 45

};


/* =================================
   PAGE NAVIGATION
================================= */

function showPage(number) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById("page" + number)
    .classList.add("active");

  if(number === 4) startTyping();

  if(number === 5) playBirthdayVideo();

}


/* =================================
   START
================================= */

function startSurprise() {

  const music = document.getElementById("music");

  music.play().catch(() => {});

  showPage(2);

  checkBirthday();

}


/* =================================
   COUNTDOWN
================================= */

function checkBirthday() {

  const now = new Date();

  if(CONFIG.previewMode || now >= CONFIG.birthday) {

    document.getElementById("countMessage").innerText =
      "Your special moment is here ❤️";

    showPage(3);

    return;

  }

  const difference = CONFIG.birthday - now;

  document.getElementById("days").innerText =
    Math.floor(difference / 86400000);

  document.getElementById("hours").innerText =
    Math.floor((difference % 86400000) / 3600000);

  document.getElementById("minutes").innerText =
    Math.floor((difference % 3600000) / 60000);

  document.getElementById("seconds").innerText =
    Math.floor((difference % 60000) / 1000);

}


setInterval(() => {

  if(document.getElementById("page2").classList.contains("active")) {
    checkBirthday();
  }

},1000);


/* =================================
   PASSWORD
================================= */

function checkPassword() {

  const entered =
    document.getElementById("password").value;

  if(entered === CONFIG.password) {

    document.getElementById("passwordError").innerText = "";

    showPage(4);

  } else {

    document.getElementById("passwordError").innerText =
      "Wrong password! Try again ❤️";

    document.getElementById("password").value = "";

  }

}


/* =================================
   TYPING WISHES
================================= */

const birthdayMessage = `On your special day, I wish you endless happiness, beautiful memories and countless reasons to smile.

May every dream you carry in your heart come true.

உன் வாழ்க்கையில் எப்போதும் மகிழ்ச்சி நிறைந்திருக்கட்டும்.

ஒவ்வொரு நாளும் புதிய நம்பிக்கையும் அழகான நினைவுகளும் உன்னைத் தேடி வரட்டும்.

Keep smiling, keep shining and always be happy.

You deserve all the beautiful things in life.

Once again, Happy Birthday BAVANI.S! ❤️✨`;

let typingStarted = false;

function startTyping() {

  if(typingStarted) return;

  typingStarted = true;

  const output = document.getElementById("typedText");

  let index = 0;

  function type() {

    if(index < birthdayMessage.length) {

      output.textContent += birthdayMessage[index];

      index++;

      setTimeout(type,CONFIG.typingSpeed);

    } else {

      document.getElementById("wishNext")
        .style.display = "inline-block";

    }

  }

  type();

}


/* =================================
   VIDEO
================================= */

const video = document.getElementById("birthdayVideo");

function playBirthdayVideo() {

  document.getElementById("music").pause();

  video.pause();

  video.currentTime = 0;

  video.muted = true;

  video.play().catch(error => {

    document.getElementById("videoError").innerText =
      "Tap PLAY VIDEO to start ❤️";

    console.log(error);

  });

}


function playMyVideo() {

  video.muted = true;

  video.play().catch(error => {

    document.getElementById("videoError").innerText =
      "Video could not play. Check file path.";

    console.log(error);

  });

}


function enableVideoSound() {

  video.muted = false;

  video.volume = 1;

  video.play().catch(error => console.log(error));

}


video.addEventListener("error",() => {

  document.getElementById("videoError").innerText =
    "Video not found. Check 219015.mp4 in GitHub.";

});


function goToGift() {

  video.pause();

  showPage(6);

}


/* =================================
   GIFT BOX
================================= */

let giftOpened = false;

function openGift() {

  if(giftOpened) return;

  giftOpened = true;

  const gift = document.getElementById("giftBox");

  gift.style.transform = "scale(1.5) rotate(20deg)";

  setTimeout(() => {

    gift.style.display = "none";

    document.getElementById("giftHint").innerText =
      "A special memory, just for you ❤️";

    document.getElementById("photoReveal").style.display = "block";

    document.getElementById("photoText").style.display = "block";

    document.getElementById("photoNext").style.display = "inline-block";

    createBurst(window.innerWidth/2,window.innerHeight/2);

  },500);

}


/* =================================
   FLOATING EMOJI ANIMATION
================================= */

const emojiList = [
  "❤️","💕","💗","💖","🌹",
  "🦋","✨","💝","🌸","💫"
];

function createFloatingEmoji() {

  const emoji = document.createElement("span");

  emoji.className = "floating-emoji";

  emoji.textContent =
    emojiList[Math.floor(Math.random()*emojiList.length)];

  emoji.style.left = Math.random()*95 + "vw";

  emoji.style.animationDuration =
    (5 + Math.random()*5) + "s";

  emoji.style.fontSize =
    (20 + Math.random()*18) + "px";

  emoji.addEventListener("click",function(e) {

    e.stopPropagation();

    createBurst(e.clientX,e.clientY);

    emoji.remove();

  });

  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(),11000);

}

setInterval(createFloatingEmoji,650);


/* =================================
   TAP HEART EXPLOSION
================================= */

function createBurst(x,y) {

  const effects = [
    "❤️","💕","✨","💗","🌹","💖","🦋"
  ];

  for(let i=0;i<9;i++) {

    const item = document.createElement("span");

    item.className = "burst";

    item.textContent =
      effects[Math.floor(Math.random()*effects.length)];

    item.style.left = x + "px";

    item.style.top = y + "px";

    item.style.setProperty("--x",
      (Math.random()*180-90) + "px");

    item.style.setProperty("--y",
      (Math.random()*180-90) + "px");

    document.body.appendChild(item);

    setTimeout(() => item.remove(),900);

  }

}


/* Tap anywhere for small sparkle */

document.addEventListener("click",function(e) {

  const sparkle = document.createElement("span");

  sparkle.className = "sparkle";

  sparkle.textContent = "✦";

  sparkle.style.left = e.clientX + "px";

  sparkle.style.top = e.clientY + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(),1300);

});


/* =================================
   BACKGROUND MUSIC
================================= */

function toggleMusic() {

  const music = document.getElementById("music");

  if(music.paused) {

    music.play().then(() => {

      document.getElementById("musicBtn").innerText =
        "♫ MUSIC ON";

    }).catch(() => {

      document.getElementById("musicBtn").innerText =
        "♫ TAP AGAIN";

    });

  } else {

    music.pause();

    document.getElementById("musicBtn").innerText =
      "♫ MUSIC OFF";

  }

}


/* =================================
   FORMSPREE FEEDBACK
================================= */

const feedbackForm =
  document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit",async function(e) {

  e.preventDefault();

  const button = document.getElementById("submitBtn");

  const status = document.getElementById("formStatus");

  button.disabled = true;

  button.innerText = "SENDING...";

  try {

    const response = await fetch(feedbackForm.action, {

      method:"POST",

      body:new FormData(feedbackForm),

      headers: {
        "Accept":"application/json"
      }

    });

    if(response.ok) {

      feedbackForm.style.display = "none";

      document.getElementById("thankYou").style.display = "block";

      status.innerText = "Response sent successfully ❤️";

    } else {

      status.innerText = "Unable to send. Try again.";

      button.disabled = false;

      button.innerText = "TRY AGAIN ❤️";

    }

  } catch(error) {

    status.innerText = "Internet connection error.";

    button.disabled = false;

    button.innerText = "TRY AGAIN ❤️";

  }

});


/* =================================
   INITIALIZATION
================================= */

document.getElementById("musicBtn").innerText = "♫ MUSIC";

