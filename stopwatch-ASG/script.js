// Global variables for timer logic
let timerInterval = null;
let lastUpdateTime = null;
let running = false;
let timeValue = 0;      // In milliseconds. For stopwatch mode: elapsed time; for countdown: remaining time.
let timerMode = 'stopwatch'; // Either 'stopwatch' or 'countdown'

// For countdown input (a 6-digit value displayed as HH:MM:SS)
let countdownInput = "";

// Helper function to show only one screen
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
  // Stop any running timer when switching screens
  stopTimer();
}

// Formatting helper: pad number with zeros
function pad(num, size) {
  let s = "000" + num;
  return s.substr(s.length - size);
}

// Update display for the stopwatch screen.
// In stopwatch mode, we show HH:MM:SS.mmm
// In countdown mode, we show the remaining time in the same format.
function updateStopwatchDisplay() {
  const display = document.getElementById("stopwatchDisplay");
  let hours = Math.floor(timeValue / 3600000);
  let minutes = Math.floor((timeValue % 3600000) / 60000);
  let seconds = Math.floor((timeValue % 60000) / 1000);
  let milliseconds = timeValue % 1000;
  display.textContent = `${pad(hours,2)}:${pad(minutes,2)}:${pad(seconds,2)}.${pad(milliseconds,3)}`;
}

// Update the countdown screen display based on the countdownInput string.
// The input is interpreted as a 6-digit number (HHMMSS). If fewer than 6 digits, pad on the left.
function updateCountdownDisplay() {
  const display = document.getElementById("countdownDisplay");
  let padded = countdownInput.padStart(6, "0"); // always 6 digits
  let hours = padded.substring(0,2);
  let minutes = padded.substring(2,4);
  let seconds = padded.substring(4,6);
  display.textContent = `${hours}:${minutes}:${seconds}`;
}

// Timer tick function. Calculates time delta since last tick.
function tick() {
  const now = Date.now();
  const delta = now - lastUpdateTime;
  lastUpdateTime = now;

  if (timerMode === 'stopwatch') {
    timeValue += delta;
  } else if (timerMode === 'countdown') {
    timeValue -= delta;
    if (timeValue <= 0) {
      timeValue = 0;
      stopTimer();
      // Optionally, you could alert the user that time is up.
    }
  }
  updateStopwatchDisplay();
}

// Start the timer (either counting up or down)
function startTimer() {
  if (!running) {
    running = true;
    lastUpdateTime = Date.now();
    timerInterval = setInterval(tick, 10);
  }
}

// Stop the timer
function stopTimer() {
  running = false;
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset the timer value to zero (for both modes)
function resetTimer() {
  stopTimer();
  timeValue = 0;
  updateStopwatchDisplay();
  document.getElementById("startPauseBtn").textContent = "Start";
}

// ===================== Event Listeners =====================

// Navigation from Main Screen
document.getElementById("toStopwatch").addEventListener("click", () => {
  // Enter stopwatch mode: reset state.
  timerMode = 'stopwatch';
  resetTimer();
  showScreen("stopwatchScreen");
});

document.getElementById("toCountdown").addEventListener("click", () => {
  // Enter countdown screen: clear input.
  countdownInput = "";
  updateCountdownDisplay();
  showScreen("countdownScreen");
});

// Back buttons
document.getElementById("backFromStopwatch").addEventListener("click", () => {
  resetTimer();
  showScreen("mainScreen");
});
document.getElementById("backFromCountdown").addEventListener("click", () => {
  showScreen("mainScreen");
});

// Stopwatch Screen buttons
const startPauseBtn = document.getElementById("startPauseBtn");
startPauseBtn.addEventListener("click", () => {
  if (!running) {
    // Start the timer
    startTimer();
    startPauseBtn.textContent = "Pause";
  } else {
    // Pause the timer
    stopTimer();
    startPauseBtn.textContent = "Start";
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
  resetTimer();
});

// Countdown Screen digit buttons
document.querySelectorAll(".digit").forEach(button => {
  button.addEventListener("click", () => {
    // Append the digit (if already 6 digits, shift left)
    if (countdownInput.length >= 6) {
      countdownInput = countdownInput.substring(1) + button.textContent;
    } else {
      countdownInput += button.textContent;
    }
    updateCountdownDisplay();
  });
});

// Countdown Screen Clear button: resets the countdown input.
document.getElementById("clearCountdownBtn").addEventListener("click", () => {
  countdownInput = "";
  updateCountdownDisplay();
});

// When the Set button is clicked, use the entered countdown time
// to navigate to the stopwatch screen (in countdown mode).
document.getElementById("setBtn").addEventListener("click", () => {
  // Interpret the 6-digit input as HHMMSS
  let padded = countdownInput.padStart(6, "0");
  let hours = parseInt(padded.substring(0,2), 10);
  let minutes = parseInt(padded.substring(2,4), 10);
  let seconds = parseInt(padded.substring(4,6), 10);
  // Convert to milliseconds
  timeValue = ((hours * 3600) + (minutes * 60) + seconds) * 1000;

  // Set mode to countdown.
  timerMode = 'countdown';
  // Update display immediately.
  updateStopwatchDisplay();
  // Reset the start/pause button to "Start"
  startPauseBtn.textContent = "Start";
  showScreen("stopwatchScreen");
});
