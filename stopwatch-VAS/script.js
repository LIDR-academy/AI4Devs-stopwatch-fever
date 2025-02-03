
let timer;
let running = false;
let startTime = 0;
let elapsedTime = 0;

const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const millisecondsSpan = document.getElementById("milliseconds");
const startPauseButton = document.getElementById("startPause");
const clearButton = document.getElementById("clear");

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;

    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(3, '0')
    };
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    minutesSpan.textContent = time.minutes;
    secondsSpan.textContent = time.seconds;
    millisecondsSpan.textContent = time.milliseconds;
}

function startPauseTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseButton.textContent = "Pause";
        startPauseButton.style.background = "orange";
        running = true;
    } else {
        clearInterval(timer);
        startPauseButton.textContent = "Resume";
        startPauseButton.style.background = "blue";
        running = false;
    }
}

function clearTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    updateDisplay();
    startPauseButton.textContent = "Start";
    startPauseButton.style.background = "#4CAF50";
}

startPauseButton.addEventListener("click", startPauseTimer);
clearButton.addEventListener("click", clearTimer);

updateDisplay();
