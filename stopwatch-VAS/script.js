document.addEventListener("DOMContentLoaded", function () {
    let stopwatchScreen = document.getElementById("stopwatch-screen");
    let countdownScreen = document.getElementById("countdown-screen");
    let initialScreen = document.getElementById("initial-screen");

    // Mode Selection
    document.getElementById("stopwatch-btn").addEventListener("click", () => {
        initialScreen.classList.add("hidden");
        stopwatchScreen.classList.remove("hidden");
    });

    document.getElementById("countdown-btn").addEventListener("click", () => {
        initialScreen.classList.add("hidden");
        countdownScreen.classList.remove("hidden");
    });

    document.getElementById("back-to-menu").addEventListener("click", () => {
        stopwatchScreen.classList.add("hidden");
        initialScreen.classList.remove("hidden");
    });

    document.getElementById("back-to-menu-2").addEventListener("click", () => {
        countdownScreen.classList.add("hidden");
        initialScreen.classList.remove("hidden");
    });

    // ------------------ Stopwatch Functionality ------------------
    let timer;
    let elapsedTime = 0;
    let running = false;
    let startPauseBtn = document.getElementById("startPause");

    function updateStopwatchDisplay() {
        let date = new Date(elapsedTime);
        document.getElementById("timer").textContent = date.toISOString().substr(11, 12);
    }

    function startPauseStopwatch() {
        if (running) {
            clearInterval(timer);
            startPauseBtn.textContent = "Resume";
            startPauseBtn.classList.remove("pause");
            startPauseBtn.classList.add("resume");
        } else {
            let startTime = Date.now() - elapsedTime;
            timer = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateStopwatchDisplay();
            }, 10);
            startPauseBtn.textContent = "Pause";
            startPauseBtn.classList.remove("resume");
            startPauseBtn.classList.add("pause");
        }
        running = !running;
    }

    function clearStopwatch() {
        clearInterval(timer);
        elapsedTime = 0;
        running = false;
        updateStopwatchDisplay();
        startPauseBtn.textContent = "Start";
        startPauseBtn.className = "";
    }

    startPauseBtn.addEventListener("click", startPauseStopwatch);
    document.getElementById("clear").addEventListener("click", clearStopwatch);
    updateStopwatchDisplay();

    // ------------------ Countdown Functionality ------------------
    let countdownTime = 0;
    let countdownRunning = false;
    let countdownTimer;
    let startPauseCountdownBtn = document.getElementById("startPauseCountdown");

    function updateCountdownDisplay() {
        let date = new Date(countdownTime);
        document.getElementById("countdown-timer").textContent = date.toISOString().substr(11, 8);
    }

    function startPauseCountdown() {
        if (countdownRunning) {
            clearInterval(countdownTimer);
            startPauseCountdownBtn.textContent = "Resume";
            startPauseCountdownBtn.classList.remove("pause");
            startPauseCountdownBtn.classList.add("resume");
        } else {
            if (countdownTime <= 0) {
                let hours = parseInt(document.getElementById("hours").value) || 0;
                let minutes = parseInt(document.getElementById("minutes").value) || 0;
                let seconds = parseInt(document.getElementById("seconds").value) || 0;
                countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
            }

            let startTime = Date.now();
            countdownTimer = setInterval(() => {
                let elapsed = Date.now() - startTime;
                countdownTime -= elapsed;
                startTime = Date.now();

                if (countdownTime <= 0) {
                    clearInterval(countdownTimer);
                    countdownTime = 0;
                }
                updateCountdownDisplay();
            }, 1000);
            startPauseCountdownBtn.textContent = "Pause";
            startPauseCountdownBtn.classList.remove("resume");
            startPauseCountdownBtn.classList.add("pause");
        }
        countdownRunning = !countdownRunning;
    }

    function clearCountdown() {
        clearInterval(countdownTimer);
        countdownTime = 0;
        countdownRunning = false;
        updateCountdownDisplay();
        startPauseCountdownBtn.textContent = "Start";
        startPauseCountdownBtn.className = "";
    }

    startPauseCountdownBtn.addEventListener("click", startPauseCountdown);
    document.getElementById("clearCountdown").addEventListener("click", clearCountdown);
    updateCountdownDisplay();
});
