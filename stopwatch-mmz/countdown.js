let countdownTime = 0;
let countdownInterval;
let running = false;

const display = document.getElementById('countdown-display');
const startButton = document.getElementById('start-countdown');
const setButton = document.getElementById('set-countdown');
const clearButton = document.getElementById('clear-countdown');

// Numeric Keypad Input Handling
function addNumber(num) {
    document.getElementById('countdown-input').value += num;
}

function clearInput() {
    document.getElementById('countdown-input').value = "";
}

// Setting Countdown Time
setButton.addEventListener('click', function () {
    countdownTime = parseInt(document.getElementById('countdown-input').value) || 0;
    if (countdownTime > 0) {
        document.getElementById('countdown-setup').classList.add('hidden');
        document.getElementById('countdown-timer').classList.remove('hidden');
        display.textContent = formatCountdown(countdownTime);
        startButton.textContent = "Start";
    }
});

// Start/Pause Countdown
startButton.addEventListener('click', function () {
    if (!running && countdownTime > 0) {
        running = true;
        startButton.textContent = "Pause";
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                display.textContent = formatCountdown(countdownTime);
            } else {
                clearInterval(countdownInterval);
                running = false;
                startButton.textContent = "Start";
            }
        }, 1000);
    } else {
        running = false;
        startButton.textContent = "Start";
        clearInterval(countdownInterval);
    }
});

// Clear Countdown and Reset UI
clearButton.addEventListener('click', function () {
    clearInterval(countdownInterval);
    running = false;
    document.getElementById('countdown-setup').classList.remove('hidden');
    document.getElementById('countdown-timer').classList.add('hidden');
    document.getElementById('countdown-input').value = "";
    countdownTime = 0;
    startButton.textContent = "Start";
});

// Format Countdown Display (MM:SS)
function formatCountdown(seconds) {
    let m = String(Math.floor(seconds / 60)).padStart(2, '0');
    let s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}
