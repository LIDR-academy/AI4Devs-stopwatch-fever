let countdownTimer;
let isCountingDown = false;
let initialTime = 0;
let remainingTime = 0;
let inputArray = [0, 0, 0, 0, 0, 0]; // hh:mm:ss

function addDigit(digit) {
    if (inputArray[0] !== 0) return; // No permitir más de 6 dígitos

    inputArray.shift();
    inputArray.push(digit);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("hours").textContent = `${inputArray[0]}${inputArray[1]}`;
    document.getElementById("minutes").textContent = `${inputArray[2]}${inputArray[3]}`;
    document.getElementById("seconds").textContent = `${inputArray[4]}${inputArray[5]}`;
    document.getElementById("milliseconds").textContent = "000";
}

function setCountdown() {
    let hours = parseInt(`${inputArray[0]}${inputArray[1]}`, 10);
    let minutes = parseInt(`${inputArray[2]}${inputArray[3]}`, 10);
    let seconds = parseInt(`${inputArray[4]}${inputArray[5]}`, 10);

    if (hours > 24 || minutes > 60 || seconds > 60) {
        alert("Horas deben ser ≤ 24, minutos y segundos ≤ 60.");
        return;
    }

    initialTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    remainingTime = initialTime;

    document.getElementById("input-buttons").classList.add("hidden");
    document.getElementById("start-clear-buttons").classList.remove("hidden");
    displayTime(remainingTime);
}

function toggleCountdown() {
    const startPauseBtn = document.getElementById("startPauseBtn");

    if (isCountingDown) {
        clearInterval(countdownTimer);
        startPauseBtn.textContent = "Continue";
        isCountingDown = false;
    } else {
        startCountdown();
        startPauseBtn.textContent = "Pause";
        isCountingDown = true;
    }
}

function startCountdown() {
    countdownTimer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(countdownTimer);
            triggerAlarm();
            return;
        }

        remainingTime -= 10;
        displayTime(remainingTime);
    }, 10);
}

function displayTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600) % 100;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(3, "0");
}

function triggerAlarm() {
    document.getElementById("startPauseBtn").classList.add("hidden");
    document.querySelector(".display").classList.add("alarm");
    playAlarmSound();
}

function playAlarmSound() {
    const alarmSound = new Audio("alarm.mp3");
    alarmSound.play();
}

function clearCountdown() {
    clearInterval(countdownTimer);
    isCountingDown = false;

    inputArray = [0, 0, 0, 0, 0, 0];
    updateDisplay();

    document.getElementById("input-buttons").classList.remove("hidden");
    document.getElementById("start-clear-buttons").classList.add("hidden");
}

function resetCountdown() {
    clearInterval(countdownTimer);
    remainingTime = initialTime;
    displayTime(remainingTime);

    document.getElementById("startPauseBtn").textContent = "Start";
    document.getElementById("startPauseBtn").classList.remove("hidden");
    document.querySelector(".display").classList.remove("alarm");
}
