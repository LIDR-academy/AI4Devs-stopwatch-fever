let stopwatchInterval;
let stopwatchTime = 0;
let running = false;
const display = document.getElementById('stopwatch-display');
const startButton = document.getElementById('start-stopwatch');

startButton.addEventListener('click', function () {
    if (!running) {
        running = true;
        startButton.textContent = "Pause";
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 10; // Increase time in milliseconds
            display.textContent = formatTime(stopwatchTime);
        }, 10);
    } else {
        running = false;
        startButton.textContent = "Start";
        clearInterval(stopwatchInterval);
    }
});

document.getElementById('clear-stopwatch').addEventListener('click', function () {
    running = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    startButton.textContent = "Start";
    display.textContent = "00:00:00.00";
});

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');
    let milliseconds = String(ms % 1000).padStart(3, '0').slice(0, 2); // Show only 2 decimals
    return `${minutes}:${seconds}.${milliseconds}`;
}
