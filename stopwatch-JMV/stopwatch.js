let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function toggleStopwatch() {
    const startPauseBtn = document.getElementById("startPauseBtn");

    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startPauseBtn.textContent = "Continue";
        startPauseBtn.className = "pause";
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.className = "pause";
    }

    isRunning = !isRunning;
}

function updateDisplay() {
    const now = Date.now();
    const timeElapsed = elapsedTime + (now - startTime);

    const milliseconds = Math.floor((timeElapsed % 1000));
    const seconds = Math.floor((timeElapsed / 1000) % 60);
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
    const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);

    document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(3, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById("startPauseBtn").textContent = "Start";
    document.getElementById("startPauseBtn").className = "start";

    document.getElementById("milliseconds").textContent = "000";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("hours").textContent = "00";
}
