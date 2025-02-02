let timer;
let startTime;
let elapsedTime = 0;
let running = false;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

const startPauseBtn = document.getElementById("start-pause-btn");
const clearBtn = document.getElementById("clear-btn");

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;

    let totalMilliseconds = elapsedTime % 1000;
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);

    let seconds = totalSeconds % 60;
    let minutes = totalMinutes % 60;
    let hours = totalHours;

    hoursDisplay.textContent = String(hours).padStart(2, "0");
    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
    millisecondsDisplay.textContent = String(totalMilliseconds).padStart(3, "0");
}

function startPauseStopwatch() {
    if (running) {
        clearInterval(timer);
        startPauseBtn.textContent = "Continue";
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startPauseBtn.textContent = "Pause";
    }
    running = !running;
    clearBtn.disabled = false;
}

function clearStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;

    hoursDisplay.textContent = "00";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
    millisecondsDisplay.textContent = "000";

    startPauseBtn.textContent = "Start";
    clearBtn.disabled = true;
}

startPauseBtn.addEventListener("click", startPauseStopwatch);
clearBtn.addEventListener("click", clearStopwatch);
