let modeSelection = document.getElementById('mode-selection');
let timerContainer = document.getElementById('timer-container');
let timerDisplay = document.getElementById('timer');
let millisecondsDisplay = document.querySelector('.milliseconds');
let startBtn = document.getElementById('startBtn');
let clearBtn = document.getElementById('clearBtn');
let backBtn = document.getElementById('backBtn');
let stopwatchBtn = document.getElementById('stopwatchBtn');
let countdownBtn = document.getElementById('countdownBtn');
let numpad = document.getElementById('numpad');
let inputTime = '000000'; // Format: HHMMSS
let startTime;
let elapsedTime = 0;
let timerId = null;
let isRunning = false;
let isStopwatchMode = true;
let countdownDuration = 0;

// Remove all duplicate variable declarations (lines 39-45)
// Keep only the ones at the top of the file

function showTimer(mode) {
    clearTimer(); // Clear any existing timer
    isStopwatchMode = mode === 'stopwatch';
    modeSelection.classList.add('hidden');
    timerContainer.classList.remove('hidden');
    if (!isStopwatchMode) {
        numpad.classList.remove('hidden');
        inputTime = '000000';
        countdownDuration = 0;
    } else {
        numpad.classList.add('hidden');
    }
    elapsedTime = 0;
    updateDisplay();
}

function updateCountdownFromInput() {
    const hours = parseInt(inputTime.substring(0, 2));
    const minutes = parseInt(inputTime.substring(2, 4));
    const seconds = parseInt(inputTime.substring(4, 6));
    countdownDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
    updateDisplay();
}

function handleNumpadInput(value) {
    if (value === 'Set') {
        updateCountdownFromInput();
        numpad.classList.add('hidden');
        elapsedTime = countdownDuration; // Set initial elapsed time to countdown duration
    } else if (value === 'Clear') {
        inputTime = '000000';
        updateCountdownFromInput();
    } else {
        inputTime = inputTime.substring(1) + value;
        updateCountdownFromInput();
    }
}

// Add missing resetTimer function
function resetTimer() {
    clearInterval(timerId);
    elapsedTime = isStopwatchMode ? 0 : countdownDuration;
    isRunning = false;
    startBtn.textContent = '▶️ Start';
    updateDisplay();
}

function updateDisplay() {
    let totalMilliseconds;
    if (isStopwatchMode) {
        totalMilliseconds = elapsedTime;
    } else {
        totalMilliseconds = countdownDuration;
        if (isRunning) {
            totalMilliseconds = Math.max(0, elapsedTime);
        }
    }
    
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = totalMilliseconds % 1000;
    
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    millisecondsDisplay.textContent = String(milliseconds).padStart(3, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = '⏸️ Stop';
        const currentTime = Date.now();
        if (isStopwatchMode) {
            startTime = currentTime - elapsedTime;
        } else {
            startTime = currentTime - (countdownDuration - elapsedTime);
        }
        timerId = setInterval(() => {
            const now = Date.now();
            if (isStopwatchMode) {
                elapsedTime = now - startTime;
            } else {
                const timeElapsed = now - startTime;
                elapsedTime = countdownDuration - timeElapsed;
                if (elapsedTime <= 0) {
                    clearTimer();
                    return;
                }
            }
            updateDisplay();
        }, 10);
    } else {
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = '▶️ Start';
    }
}

// Add event listeners for numpad
document.querySelectorAll('.num-btn').forEach(button => {
    button.addEventListener('click', () => handleNumpadInput(button.textContent));
});

document.querySelector('.set-btn').addEventListener('click', () => handleNumpadInput('Set'));
document.querySelector('.clear-num-btn').addEventListener('click', () => handleNumpadInput('Clear'));

function clearTimer() {
    clearInterval(timerId);
    if (isStopwatchMode) {
        elapsedTime = 0;
    } else {
        inputTime = '000000';
        countdownDuration = 0;
        elapsedTime = 0;
        numpad.classList.remove('hidden');
    }
    isRunning = false;
    startBtn.textContent = 'Start';
    updateDisplay();
}

function showModeSelection() {
    clearTimer();
    timerContainer.classList.add('hidden');
    modeSelection.classList.remove('hidden');
    if (!isStopwatchMode) {
        inputTime = '000000';
        countdownDuration = 0;
    }
}

// Make sure these event listeners are at the bottom of the file
stopwatchBtn.addEventListener('click', () => showTimer('stopwatch'));
countdownBtn.addEventListener('click', () => showTimer('countdown'));
backBtn.addEventListener('click', showModeSelection);
startBtn.addEventListener('click', startTimer);
clearBtn.addEventListener('click', clearTimer);

// Show mode selection initially
timerContainer.classList.add('hidden');
numpad.classList.add('hidden');
modeSelection.classList.remove('hidden');

// Initialize display
updateDisplay();

// Modify the exports at the end of the file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateDisplay,
        startTimer,
        clearTimer,
        showTimer,
        updateCountdownFromInput,
        handleNumpadInput,
        resetTimer,
        showModeSelection,
        // Add state variables for testing
        state: {
            get isRunning() { return isRunning; },
            get isStopwatchMode() { return isStopwatchMode; },
            get elapsedTime() { return elapsedTime; },
            get countdownDuration() { return countdownDuration; },
            get inputTime() { return inputTime; }
        }
    };
}
