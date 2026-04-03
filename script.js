
function start() {
  document.getElementById("screen1").classList.remove("active");
  document.getElementById("screen2").classList.add("active");

  confetti({ particleCount: 200, spread: 120 });
}

/* notes */
let notes = [
  "You always made my childhood better 💖",
  "So many memories with you 😄",
  "You are my forever support ❤️",
  "We grew up together 🥺",
  "I will always stand by you 💫"
];

function showNote(i) {
  document.getElementById("note").innerText = notes[i];
}

function nextToJar() {
  document.getElementById("screen2").classList.remove("active");
  document.getElementById("screen3").classList.add("active");
}

/* jar */
let compliments = [
  "Your smile lights up everything",
  "You are incredibly strong",
  "You inspire everyone",
  "You are kind and pure",
  "You never give up",
  "You make life beautiful",
  "You are special",
  "You bring happiness",
  "You are loved deeply",
  "You are amazing"
];

let count = 0;

function popCompliment() {
  document.getElementById("compliment").innerText =
    compliments[Math.floor(Math.random() * compliments.length)];

  confetti({ particleCount: 100, spread: 100 });

  count++;

  if (count >= 5) {
    document.getElementById("finalBtn").style.display = "block";
  }
}

/* cake */
function goToCake() {
  document.getElementById("screen3").classList.remove("active");
  document.getElementById("screen4").classList.add("active");

  startMic();
}

function startMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {

      const audioContext = new AudioContext();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      mic.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);

      function detect() {
        analyser.getByteFrequencyData(data);

        let volume = data.reduce((a, b) => a + b) / data.length;

        if (volume > 50) {
          blowOut();
        }

        requestAnimationFrame(detect);
      }

      detect();
    });
}

function blowOut() {
  document.getElementById("flame").style.display = "none";

  document.getElementById("cakeMsg").innerText =
    "🎉 HAPPY BIRTHDAY LAMCY 💖";

  confetti({ particleCount: 300, spread: 150 });

  setTimeout(finalScreen, 2000);
}

/* final */
function finalScreen() {
  document.getElementById("screen4").classList.remove("active");
  document.getElementById("screen5").classList.add("active");

  let text = "Happy Birthday Lamcy 💖 You are not just my sister, but someone who makes life brighter. Keep growing, keep shining, and never stop believing in yourself. The future is yours.";

  let i = 0;

  function type() {
    if (i < text.length) {
      document.getElementById("finalText").innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 40);
    }
  }

  type();
}