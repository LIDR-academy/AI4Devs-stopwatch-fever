class Stopwatch {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        
        this.display = document.querySelector('.time-display');
        this.startStopButton = document.getElementById('startStop');
        this.clearButton = document.getElementById('clear');
        
        this.startStopButton.addEventListener('click', () => this.toggle());
        this.clearButton.addEventListener('click', () => this.clear());
        
        // Set fixed width for the start/stop button
        const buttonWidth = this.clearButton.offsetWidth;
        this.startStopButton.style.width = `${buttonWidth}px`;
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.update(), 10);
            this.startStopButton.textContent = 'Stop';
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerInterval);
            this.startStopButton.textContent = this.elapsedTime ? 'Resume' : 'Start';
        }
    }

    clear() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.elapsedTime = 0;
        this.updateDisplay();
        this.startStopButton.textContent = 'Start';
    }

    update() {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
    }

    formatTime(time) {
        return String(time).padStart(2, '0');
    }

    updateDisplay() {
        const total = this.elapsedTime;
        const hours = Math.floor(total / 3600000);
        const minutes = Math.floor((total % 3600000) / 60000);
        const seconds = Math.floor((total % 60000) / 1000);
        const milliseconds = Math.floor(total % 1000);
        
        this.display.querySelector('[aria-label="hours"]').textContent = this.formatTime(hours);
        this.display.querySelector('[aria-label="minutes"]').textContent = this.formatTime(minutes);
        this.display.querySelector('[aria-label="seconds"]').textContent = this.formatTime(seconds);
        this.display.querySelector('[aria-label="milliseconds"]').textContent = String(milliseconds).padStart(3, '0');
    }
}

// Initialize stopwatch when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});