document.addEventListener("DOMContentLoaded", () => {
    const timerBtn = document.getElementById("timer-btn");
    const countdownBtn = document.getElementById("countdown-btn");
    const timerContainer = document.getElementById("timer-container");
    const countdownContainer = document.getElementById("countdown-container");
    const timerDisplay = document.getElementById("timer-display");
    const countdownDisplay = document.getElementById("countdown-display");
    const startPauseBtn = document.getElementById("start-pause-btn");
    const clearBtn = document.getElementById("clear-btn");
    const backBtnTimer = document.getElementById("back-btn-timer");
    const numButtons = document.querySelectorAll(".num-btn");
    const setBtn = document.getElementById("set-btn");
    const clearCountdownBtn = document.getElementById("clear-countdown-btn");
    const backBtnCountdown = document.getElementById("back-btn-countdown");
    
    let timerInterval, countdownInterval;
    let timerRunning = false;
    let countdownTime = 0;
    let countdownInitialTime = 0;
    let elapsedTime = 0;
    let startTime;

    function formatTime(ms) {
        let date = new Date(ms);
        return date.toISOString().substr(11, 12);
    }

    timerBtn.addEventListener("click", () => {
        timerContainer.style.display = "block";
        document.querySelector(".options").style.display = "none";
    });

    countdownBtn.addEventListener("click", () => {
        countdownContainer.style.display = "block";
        document.querySelector(".options").style.display = "none";
    });

    startPauseBtn.addEventListener("click", () => {
        if (timerRunning) {
            clearInterval(timerInterval);
            elapsedTime += Date.now() - startTime;
            startPauseBtn.textContent = "Continue";
            startPauseBtn.className = "blue-btn";
        } else {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                timerDisplay.textContent = formatTime(Date.now() - startTime + elapsedTime);
            }, 10);
            startPauseBtn.textContent = "Pause";
            startPauseBtn.className = "green-btn";
        }
        timerRunning = !timerRunning;
    });

    clearBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00:00:000";
        elapsedTime = 0;
        timerRunning = false;
        startPauseBtn.textContent = "Start";
        startPauseBtn.className = "green-btn";
    });

    backBtnTimer.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00:00:000";
        elapsedTime = 0;
        timerRunning = false;
        timerContainer.style.display = "none";
        document.querySelector(".options").style.display = "block";
    });

    numButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (countdownTime.toString().length < 6) {
                countdownTime = countdownTime * 10 + parseInt(button.textContent);
                countdownDisplay.textContent = formatTime(countdownTime * 1000);
            }
        });
    });

    setBtn.addEventListener("click", () => {
        if (countdownTime === 0) countdownTime = 10;
        countdownInitialTime = countdownTime;
        countdownContainer.style.display = "none";
        timerContainer.style.display = "block";
        timerDisplay.textContent = formatTime(countdownTime * 1000);
        startPauseBtn.click();
    });

    clearCountdownBtn.addEventListener("click", () => {
        countdownTime = 0;
        countdownDisplay.textContent = "00:00:00:000";
    });

    backBtnCountdown.addEventListener("click", () => {
        countdownTime = 0;
        countdownDisplay.textContent = "00:00:00:000";
        countdownContainer.style.display = "none";
        document.querySelector(".options").style.display = "block";
    });
});
