let stopwatchTime = 0;
let stopwatchInterval;
let isRunning = false;

function showMenu() {
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("stopwatch").classList.add("hidden");
    document.getElementById("countdown").classList.add("hidden");
}

function showStopwatch() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("stopwatch").classList.remove("hidden");
}

function showCountdown() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("countdown").classList.remove("hidden");
}

// Cronómetro
function startStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            document.querySelector("#stopwatch .timer-display").textContent = formatTime(stopwatchTime);
        }, 1000);
        document.getElementById("startStop").textContent = "Pause";
    }
    isRunning = !isRunning;
}

function clearStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    document.querySelector("#stopwatch .timer-display").textContent = "00:00:00";
}

document.getElementById("startStop").addEventListener("click", startStopwatch);
document.getElementById("clearStopwatch").addEventListener("click", clearStopwatch);

// Cuenta Atrás
let countdownTime = 0;
let countdownInterval;

function setTime(num) {
    let strTime = countdownTime.toString().padStart(6, "0") + num;
    countdownTime = parseInt(strTime.slice(-6));
    document.querySelector("#countdown .timer-display").textContent = formatTime(countdownTime);
}

function startCountdown() {
    if (countdownTime <= 0) {
        alert("Introduce un tiempo válido.");
        return;
    }

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            countdownTime--;
            document.querySelector("#countdown .timer-display").textContent = formatTime(countdownTime);
        } else {
            clearInterval(countdownInterval);
            document.querySelector("#countdown .timer-display").textContent = "00:00:00";
            new Audio('https://www.soundjay.com/button/beep-07.wav').play();
        }
    }, 1000);
}

function clearCountdown() {
    clearInterval(countdownInterval);
    countdownTime = 0;
    document.querySelector("#countdown .timer-display").textContent = "00:00:00";
}

document.getElementById("setCountdown").addEventListener("click", startCountdown);
document.getElementById("clearCountdown").addEventListener("click", clearCountdown);

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    let mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    let secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
}
