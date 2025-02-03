// script.js
// Menu functionality
const stopwatchSection = document.getElementById('stopwatch-section');
const countdownSection = document.getElementById('countdown-section');
const showStopwatchButton = document.getElementById('show-stopwatch');
const showCountdownButton = document.getElementById('show-countdown');

showStopwatchButton.addEventListener('click', () => {
    stopwatchSection.classList.remove('hidden');
    countdownSection.classList.add('hidden');
});

showCountdownButton.addEventListener('click', () => {
    countdownSection.classList.remove('hidden');
    stopwatchSection.classList.add('hidden');
});

// Stopwatch functionality
let stopwatchInterval;
let stopwatchTime = 0;
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startStopwatchButton = document.getElementById('start-stopwatch');
const pauseStopwatchButton = document.getElementById('pause-stopwatch');
const resetStopwatchButton = document.getElementById('reset-stopwatch');

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startStopwatch() {
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }, 1000);
    startStopwatchButton.disabled = true;
    pauseStopwatchButton.disabled = false;
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    startStopwatchButton.disabled = false;
    pauseStopwatchButton.disabled = true;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchDisplay.textContent = formatTime(stopwatchTime);
    startStopwatchButton.disabled = false;
    pauseStopwatchButton.disabled = true;
}

startStopwatchButton.addEventListener('click', startStopwatch);
pauseStopwatchButton.addEventListener('click', pauseStopwatch);
resetStopwatchButton.addEventListener('click', resetStopwatch);

// Countdown functionality
let countdownInterval;
const countdownInput = document.getElementById('countdown-input');
const countdownDisplay = document.getElementById('countdown-display');
const startCountdownButton = document.getElementById('start-countdown');
const resetCountdownButton = document.getElementById('reset-countdown');

function startCountdown() {
    let timeLeft = parseInt(countdownInput.value);
    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert('Please enter a valid time in seconds.');
        return;
    }

    countdownDisplay.textContent = formatTime(timeLeft);
    countdownInput.disabled = true;
    startCountdownButton.disabled = true;
    resetCountdownButton.disabled = false;

    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert('Countdown finished!');
            countdownInput.disabled = false;
            startCountdownButton.disabled = false;
            resetCountdownButton.disabled = true;
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = '00:00:00';
    countdownInput.value = '';
    countdownInput.disabled = false;
    startCountdownButton.disabled = false;
    resetCountdownButton.disabled = true;
}

startCountdownButton.addEventListener('click', startCountdown);
resetCountdownButton.addEventListener('click', resetCountdown);