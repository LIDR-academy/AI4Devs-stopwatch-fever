let startPauseBtn = document.getElementById('start-pause-btn');
let clearBtn = document.getElementById('clear-btn');
let timeDisplay = document.getElementById('time-display');

let timer = null;
let elapsedTime = 0;
let isRunning = false;

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        // Pause the stopwatch
        clearInterval(timer);
        startPauseBtn.textContent = 'Continue';
    } else {
        // Start or continue the stopwatch
        timer = setInterval(() => {
            elapsedTime += 1000;
            updateTimeDisplay();
        }, 1000);
        startPauseBtn.textContent = 'Pause';
        clearBtn.disabled = false;
    }
    isRunning = !isRunning;
});

clearBtn.addEventListener('click', () => {
    if (!isRunning) {
        elapsedTime = 0;
        updateTimeDisplay();
        clearBtn.disabled = true;
        startPauseBtn.textContent = 'Start';
    }
});

function updateTimeDisplay() {
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);

    timeDisplay.textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
