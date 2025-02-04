let countdownTime = 0;
let countdownTimer;
let isCountingDown = false;

function addDigit(digit) {
    let totalSeconds = Math.floor(countdownTime / 1000);
    let newTime = (totalSeconds * 10) + digit;

    if (newTime > 359999) return; // Límite: 99:59:59

    countdownTime = newTime * 1000;
    updateDisplay();
}

function setCountdown() {
    document.getElementById("input-section").classList.add("hidden");
    document.getElementById("countdown-controls").classList.remove("hidden");
}

function toggleCountdown() {
    const startPauseBtn = document.getElementById("startPauseBtn");

    if (isCountingDown) {
        clearInterval(countdownTimer);
        startPauseBtn.textContent = "Continue";
        startPauseBtn.className = "pause";
    } else {
        countdownTimer = setInterval(updateCountdown, 10);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.className = "start";
    }

    isCountingDown = !isCountingDown;
}

function updateCountdown() {
    if (countdownTime <= 0) {
        clearInterval(countdownTimer);
        document.getElementById("startPauseBtn").classList.add("hidden");
        document.querySelector(".display").classList.add("blinking");
        document.getElementById("alarm-sound").play();
        return;
    }

    countdownTime -= 10;
    updateDisplay();
}

function clearCountdown() {
    clearInterval(countdownTimer);
    countdownTime = 0;
    isCountingDown = false;
    document.getElementById("input-section").classList.remove("hidden");
    document.getElementById("countdown-controls").classList.add("hidden");
    document.getElementById("startPauseBtn").textContent = "Start";
    document.getElementById("startPauseBtn").className = "start";
    document.querySelector(".display").classList.remove("blinking");
    updateDisplay();
}

function updateDisplay() {
    let totalSeconds = Math.floor(countdownTime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}
