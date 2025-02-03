document.addEventListener("DOMContentLoaded", () => {
    let stopwatchDisplay = document.getElementById("stopwatchDisplay");
    let countdownDisplay = document.getElementById("countdownDisplay");

    let stopwatchModeBtn = document.getElementById("stopwatchMode");
    let countdownModeBtn = document.getElementById("countdownMode");

    let stopwatchDiv = document.getElementById("stopwatch");
    let countdownDiv = document.getElementById("countdown");

    let startStopwatchBtn = document.getElementById("startStopwatch");
    let clearStopwatchBtn = document.getElementById("clearStopwatch");

    let setCountdownBtn = document.getElementById("setCountdown");
    let clearCountdownBtn = document.getElementById("clearCountdown");

    let numButtons = document.querySelectorAll(".num");

    let stopwatchRunning = false;
    let stopwatchInterval;
    let stopwatchTime = 0;

    let countdownTime = 0;
    let countdownInterval;
    let countdownActive = false;

    // Switch Modes
    stopwatchModeBtn.addEventListener("click", () => {
        stopwatchDiv.classList.remove("hidden");
        countdownDiv.classList.add("hidden");
    });

    countdownModeBtn.addEventListener("click", () => {
        stopwatchDiv.classList.add("hidden");
        countdownDiv.classList.remove("hidden");
    });

    // Stopwatch Logic
    function updateStopwatchDisplay() {
        let minutes = String(Math.floor(stopwatchTime / 6000)).padStart(2, "0");
        let seconds = String(Math.floor((stopwatchTime % 6000) / 100)).padStart(2, "0");
        let milliseconds = String(stopwatchTime % 100).padStart(2, "0");
        stopwatchDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
    }

    startStopwatchBtn.addEventListener("click", () => {
        if (!stopwatchRunning) {
            stopwatchRunning = true;
            startStopwatchBtn.textContent = "Stop";
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                updateStopwatchDisplay();
            }, 10);
        } else {
            stopwatchRunning = false;
            startStopwatchBtn.textContent = "Start";
            clearInterval(stopwatchInterval);
        }
    });

    clearStopwatchBtn.addEventListener("click", () => {
        stopwatchRunning = false;
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        updateStopwatchDisplay();
        startStopwatchBtn.textContent = "Start";
    });

    // Countdown Logic
    function updateCountdownDisplay() {
        let minutes = String(Math.floor(countdownTime / 60)).padStart(2, "0");
        let seconds = String(countdownTime % 60).padStart(2, "0");
        countdownDisplay.textContent = `${minutes}:${seconds}:00`;
    }

    numButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (countdownTime < 9999) {
                countdownTime = countdownTime * 10 + parseInt(button.dataset.num);
                updateCountdownDisplay();
            }
        });
    });

    setCountdownBtn.addEventListener("click", () => {
        if (!countdownActive && countdownTime > 0) {
            countdownActive = true;
            countdownInterval = setInterval(() => {
                if (countdownTime > 0) {
                    countdownTime--;
                    updateCountdownDisplay();
                } else {
                    clearInterval(countdownInterval);
                    countdownActive = false;
                    alert("Time's up!");
                }
            }, 1000);
        }
    });

    clearCountdownBtn.addEventListener("click", () => {
        clearInterval(countdownInterval);
        countdownTime = 0;
        updateCountdownDisplay();
        countdownActive = false;
    });

    updateStopwatchDisplay();
    updateCountdownDisplay();
});
