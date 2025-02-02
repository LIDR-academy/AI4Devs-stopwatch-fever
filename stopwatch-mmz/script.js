document.addEventListener("DOMContentLoaded", function () {
    const homeScreen = document.getElementById("home-screen");
    const stopwatchScreen = document.getElementById("stopwatch-screen");
    const countdownSetupScreen = document.getElementById("countdown-setup-screen");
    const countdownScreen = document.getElementById("countdown-screen");

    const gotoStopwatch = document.getElementById("goto-stopwatch");
    const gotoCountdown = document.getElementById("goto-countdown");
    const backHome1 = document.getElementById("back-home-1");
    const backHome2 = document.getElementById("back-home-2");
    const backToSetup = document.getElementById("back-to-setup");

    const startStopwatch = document.getElementById("start-stopwatch");
    const clearStopwatch = document.getElementById("clear-stopwatch");
    const stopwatchDisplay = document.getElementById("stopwatch-display");

    const countdownInputDisplay = document.getElementById("countdown-input-display");
    const setCountdown = document.getElementById("set-countdown");
    const clearInput = document.getElementById("clear-input");

    const countdownDisplay = document.getElementById("countdown-display");
    const startCountdown = document.getElementById("start-countdown");
    const clearCountdown = document.getElementById("clear-countdown");

    let stopwatchInterval, countdownInterval;
    let stopwatchRunning = false;
    let countdownRunning = false;
    let countdownTime = 0;

    function showScreen(screen) {
        homeScreen.classList.add("hidden");
        stopwatchScreen.classList.add("hidden");
        countdownSetupScreen.classList.add("hidden");
        countdownScreen.classList.add("hidden");
        screen.classList.remove("hidden");
    }

    gotoStopwatch.addEventListener("click", () => showScreen(stopwatchScreen));
    gotoCountdown.addEventListener("click", () => showScreen(countdownSetupScreen));
    backHome1.addEventListener("click", () => showScreen(homeScreen));
    backHome2.addEventListener("click", () => showScreen(homeScreen));
    backToSetup.addEventListener("click", () => showScreen(countdownSetupScreen));

    startStopwatch.addEventListener("click", () => {
        if (stopwatchRunning) {
            clearInterval(stopwatchInterval);
            startStopwatch.textContent = "Start";
        } else {
            let startTime = Date.now();
            stopwatchInterval = setInterval(() => {
                let elapsed = Math.floor((Date.now() - startTime) / 1000);
                let minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
                let seconds = String(elapsed % 60).padStart(2, "0");
                stopwatchDisplay.textContent = `${minutes}:${seconds}`;
            }, 1000);
            startStopwatch.textContent = "Pause";
        }
        stopwatchRunning = !stopwatchRunning;
    });

    clearStopwatch.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        startStopwatch.textContent = "Start";
        stopwatchDisplay.textContent = "00:00:00";
    });

    setCountdown.addEventListener("click", () => {
        countdownTime = parseInt(countdownInputDisplay.textContent.replace(/:/g, ""), 10) || 0;
        if (countdownTime > 0) {
            countdownDisplay.textContent = countdownInputDisplay.textContent;
            showScreen(countdownScreen);
        }
    });

    clearInput.addEventListener("click", () => {
        countdownInputDisplay.textContent = "00:00:00";
    });

    startCountdown.addEventListener("click", () => {
        if (countdownRunning) {
            clearInterval(countdownInterval);
            startCountdown.textContent = "Start";
        } else {
            countdownInterval = setInterval(() => {
                if (countdownTime > 0) {
                    countdownTime--;
                    let minutes = String(Math.floor(countdownTime / 60)).padStart(2, "0");
                    let seconds = String(countdownTime % 60).padStart(2, "0");
                    countdownDisplay.textContent = `${minutes}:${seconds}`;
                } else {
                    clearInterval(countdownInterval);
                    countdownRunning = false;
                    startCountdown.textContent = "Start";
                }
            }, 1000);
            startCountdown.textContent = "Pause";
        }
        countdownRunning = !countdownRunning;
    });

    clearCountdown.addEventListener("click", () => {
        clearInterval(countdownInterval);
        countdownRunning = false;
        startCountdown.textContent = "Start";
        countdownDisplay.textContent = "00:00:00";
    });
});
