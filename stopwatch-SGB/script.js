const timeDisplay = document.getElementById("time-display");
const startPauseButton = document.getElementById("start-pause-button");
const resetButton = document.getElementById("reset-button");

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  // Dynamically display time units
  return `${hours ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }, 10); // Update every 10 milliseconds
  isRunning = true;
  startPauseButton.setAttribute("aria-label", "Pause");
  startPauseButton.firstElementChild.textContent = "pause";
  resetButton.disabled = false;
}

function pauseStopwatch() {
  clearInterval(intervalId);
  isRunning = false;
  startPauseButton.setAttribute("aria-label", "Resume");
  startPauseButton.firstElementChild.textContent = "play_arrow";
}

function resetStopwatch() {
  clearInterval(intervalId);
  elapsedTime = 0;
  timeDisplay.textContent = formatTime(elapsedTime);
  isRunning = false;
  startPauseButton.setAttribute("aria-label", "Start");
  startPauseButton.firstElementChild.textContent = "play_arrow";
  resetButton.disabled = true;
}

startPauseButton.addEventListener("click", () => {
  if (isRunning) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
});

resetButton.addEventListener("click", resetStopwatch);

const timerTimeDisplay = document.getElementById("timer-time-display");
const timerStartPauseButton = document.getElementById(
  "timer-start-pause-button"
);
const timerResetButton = document.getElementById("timer-reset-button");
const stopwatchButton = document.getElementById("stopwatch-button");
const timerButton = document.getElementById("timer-button");
const stopwatchContainer = document.getElementById("stopwatch-container");
const timerContainer = document.getElementById("timer-container");
const timerAlert = document.getElementById("timer-alert");
const closeAlertButton = document.getElementById("close-alert-button");
const alertSound = document.getElementById("alert-sound");

let timerStartTime = 0;
let timerElapsedTime = 0;
let timerIntervalId;
let isTimerRunning = false;

function startTimer() {
  timerStartTime = Date.now() - timerElapsedTime;
  timerIntervalId = setInterval(() => {
    timerElapsedTime = Date.now() - timerStartTime;
    const remainingTime = Math.max(0, 60000 - timerElapsedTime); // 1 minute (60000 milliseconds)
    timerTimeDisplay.textContent = formatTime(remainingTime);

    if (remainingTime === 0) {
      resetTimer();
      showAlert();
    }
  }, 10);
  isTimerRunning = true;
  timerStartPauseButton.setAttribute("aria-label", "Pause");
  timerStartPauseButton.firstElementChild.textContent = "pause";
  timerResetButton.disabled = false;
}

function showAlert() {
  timerAlert.show(); // Use show() instead of showModal()
  alertSound.play();
}

function pauseTimer() {
  clearInterval(timerIntervalId);
  isTimerRunning = false;
  timerStartPauseButton.setAttribute("aria-label", "Resume");
  timerStartPauseButton.firstElementChild.textContent = "play_arrow";
}

function resetTimer() {
  clearInterval(timerIntervalId);
  timerElapsedTime = 0;
  timerTimeDisplay.textContent = "01:00";
  isTimerRunning = false;
  timerStartPauseButton.setAttribute("aria-label", "Start");
  timerStartPauseButton.firstElementChild.textContent = "play_arrow";
  timerResetButton.disabled = true;
}

timerStartPauseButton.addEventListener("click", () => {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

timerResetButton.addEventListener("click", resetTimer);

closeAlertButton.addEventListener("click", () => {
  timerAlert.close();
});

stopwatchButton.addEventListener("click", () => {
  stopwatchContainer.style.display = "block";
  timerContainer.style.display = "none";
  stopwatchButton.classList.add("active");
  timerButton.classList.remove("active");
});

timerButton.addEventListener("click", () => {
  stopwatchContainer.style.display = "none";
  timerContainer.style.display = "block";
  stopwatchButton.classList.remove("active");
  timerButton.classList.add("active");
});
