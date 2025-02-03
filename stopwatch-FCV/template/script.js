document.addEventListener("DOMContentLoaded", () => {
    let stopwatchInterval, countdownInterval;
    let stopwatchRunning = false, countdownRunning = false;
    let elapsedTime = 0, countdownTime = 0;

    // Mode Buttons
    const stopwatchMode = document.getElementById("stopwatch-mode");
    const countdownMode = document.getElementById("countdown-mode");

    // UI Elements
    const stopwatchUI = document.getElementById("stopwatch");
    const countdownUI = document.getElementById("countdown");

    // Timer Displays
    const stopwatchDisplay = stopwatchUI.querySelector(".timer-display");
    const countdownDisplay = countdownUI.querySelector(".timer-display");

    // Stopwatch Buttons
    const startStopwatch = document.getElementById("startStopwatch");
    const resetStopwatch = document.getElementById("resetStopwatch");
    const backStopwatch = document.getElementById("backStopwatch");

    // Countdown Buttons
    const startCountdown = document.getElementById("startCountdown");
    const resetCountdown = document.getElementById("resetCountdown");
    const backCountdown = document.getElementById("backCountdown");

    const numButtons = document.querySelectorAll(".num-btn");

    function formatTime(ms) {
        let date = new Date(ms);
        return `${String(date.getUTCHours()).padStart(2, '0')}:` +
               `${String(date.getUTCMinutes()).padStart(2, '0')}:` +
               `${String(date.getUTCSeconds()).padStart(2, '0')}.` +
               `${String(date.getMilliseconds()).padStart(3, '0')}`;
    }

    function startStopwatchFn() {
        if (stopwatchRunning) {
            clearInterval(stopwatchInterval);
            startStopwatch.textContent = "Start";
        } else {
            let startTime = Date.now() - elapsedTime;
            stopwatchInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                stopwatchDisplay.textContent = formatTime(elapsedTime);
            }, 10);
            startStopwatch.textContent = "Pause";
        }
        stopwatchRunning = !stopwatchRunning;
    }

    function resetStopwatchFn() {
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        stopwatchDisplay.textContent = "00:00:00.000";
        startStopwatch.textContent = "Start";
        stopwatchRunning = false;
    }

    function startCountdownFn() {
        if (countdownRunning) {
            clearInterval(countdownInterval);
            startCountdown.textContent = "Start";
        } else {
            let startTime = Date.now();
            countdownInterval = setInterval(() => {
                let elapsed = Date.now() - startTime;
                let remaining = countdownTime - elapsed;
                if (remaining <= 0) {
                    clearInterval(countdownInterval);
                    countdownDisplay.textContent = "00:00:00.000";
                    countdownRunning = false;
                    alert("Time's up!");
                    return;
                }
                countdownDisplay.textContent = formatTime(remaining);
            }, 10);
            startCountdown.textContent = "Pause";
        }
        countdownRunning = !countdownRunning;
    }

    function resetCountdownFn() {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "00:00:00.000";
        startCountdown.textContent = "Start";
        countdownRunning = false;
    }

    // 🔹 Corrected Mode Switching Logic 🔹
    function showStopwatch() {
        // Hide countdown mode
        countdownUI.style.display = "none";
        countdownRunning = false;
        resetCountdownFn();

        // Show stopwatch mode
        stopwatchUI.style.display = "block";
    }

    function showCountdown() {
        // Hide stopwatch mode
        stopwatchUI.style.display = "none";
        stopwatchRunning = false;
        resetStopwatchFn();

        // Show countdown mode
        countdownUI.style.display = "block";
    }

    // Event Listeners for Switching Modes
    stopwatchMode.onclick = showStopwatch;
    countdownMode.onclick = showCountdown;

    // Stopwatch Controls
    startStopwatch.onclick = startStopwatchFn;
    resetStopwatch.onclick = resetStopwatchFn;
    backStopwatch.onclick = () => { stopwatchUI.style.display = "none"; };

    // Countdown Controls
    startCountdown.onclick = startCountdownFn;
    resetCountdown.onclick = resetCountdownFn;
    backCountdown.onclick = () => { countdownUI.style.display = "none"; };
});
