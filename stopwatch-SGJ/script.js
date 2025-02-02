const state = {
  currentScreen: "main",
  stopwatch: {
    running: false,
    startTime: 0,
    elapsed: 0,
    animationId: null,
  },
  countdown: {
    input: "",
    time: 0,
    intervalId: null,
    running: false,
  },
};

// Navegación
function showScreen(screen) {
  state.currentScreen = screen;
  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("screen--active", el.id === `${screen}Screen`);
  });

  if (screen === "main") {
    resetAll();
  }
}

// Fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Cronómetro
function toggleStopwatch() {
  if (!state.stopwatch.running) {
    state.stopwatch.startTime = Date.now() - state.stopwatch.elapsed;
    state.stopwatch.running = true;
    updateStopwatch();
    document.getElementById("stopwatchStart").textContent = "Pausar";
  } else {
    state.stopwatch.running = false;
    cancelAnimationFrame(state.stopwatch.animationId);
    document.getElementById("stopwatchStart").textContent = "Reanudar";
  }
}

function updateStopwatch() {
  if (!state.stopwatch.running) return;

  state.stopwatch.elapsed = Date.now() - state.stopwatch.startTime;
  const date = new Date(state.stopwatch.elapsed);

  document.getElementById("stopwatchDisplay").textContent =
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:` +
    `${pad(date.getUTCSeconds())}:${pad(date.getUTCMilliseconds(), 3)}`;

  state.stopwatch.animationId = requestAnimationFrame(updateStopwatch);
}

function resetStopwatch() {
  state.stopwatch.running = false;
  state.stopwatch.elapsed = 0;
  cancelAnimationFrame(state.stopwatch.animationId);
  document.getElementById("stopwatchDisplay").textContent = "00:00:00:000";
  document.getElementById("stopwatchStart").textContent = "Iniciar";
}

// Contador Regresivo
function addDigit(num) {
  if (state.countdown.input.length < 6) {
    state.countdown.input += num;
    updateInputDisplay();
  }
}

function updateInputDisplay() {
  const input = state.countdown.input.padStart(6, "0");
  const formatted = `${input.substr(0, 2)}:${input.substr(2, 2)}:${input.substr(
    4,
    2
  )}`;
  document.getElementById("countdownInputDisplay").textContent = formatted;
}

function setCountdown() {
  const input = state.countdown.input.padStart(6, "0");
  const hours = parseInt(input.substr(0, 2));
  const minutes = parseInt(input.substr(2, 2));
  const seconds = parseInt(input.substr(4, 2));

  if (minutes > 59 || seconds > 59) {
    alert("Valores inválidos: minutos y segundos deben ser menores a 60");
    return;
  }

  state.countdown.time = hours * 3600 + minutes * 60 + seconds;
  document.getElementById("countdownInputDisplay").style.display = "none";
  document.getElementById("countdownDisplay").style.display = "block";
  document.getElementById("setButton").style.display = "none";
  document.getElementById("startCountdown").style.display = "inline-block";
  updateCountdownDisplay();
}

function startCountdown() {
  if (state.countdown.running || state.countdown.time <= 0) return;

  state.countdown.running = true;
  state.countdown.intervalId = setInterval(() => {
    if (state.countdown.time <= 0) {
      clearInterval(state.countdown.intervalId);
      state.countdown.running = false;
      return;
    }

    state.countdown.time--;
    updateCountdownDisplay();
  }, 1000);
}

function updateCountdownDisplay() {
  const hours = Math.floor(state.countdown.time / 3600);
  const minutes = Math.floor((state.countdown.time % 3600) / 60);
  const seconds = state.countdown.time % 60;
  document.getElementById("countdownDisplay").textContent = `${pad(
    hours
  )}:${pad(minutes)}:${pad(seconds)}`;
}

function resetCountdown() {
  state.countdown.input = "";
  state.countdown.time = 0;
  state.countdown.running = false;
  clearInterval(state.countdown.intervalId);
  document.getElementById("countdownInputDisplay").style.display = "block";
  document.getElementById("countdownDisplay").style.display = "none";
  document.getElementById("setButton").style.display = "inline-block";
  document.getElementById("startCountdown").style.display = "none";
  updateInputDisplay();
}

// Utilidades
function pad(num, length = 2) {
  return String(num).padStart(length, "0");
}

function resetAll() {
  resetStopwatch();
  resetCountdown();
}

// Accesibilidad
document.addEventListener("keydown", (e) => {
  if (state.currentScreen === "countdown" && e.key >= "0" && e.key <= "9") {
    addDigit(parseInt(e.key));
  }
});
