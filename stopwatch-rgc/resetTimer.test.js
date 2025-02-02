// Import Jest testing utilities
const { jest } = require('@jest/globals');

describe('resetTimer', () => {
    // Mock DOM elements and global variables
    let timerId, elapsedTime, isStopwatchMode, countdownDuration, isRunning, startBtn, updateDisplay;

    beforeEach(() => {
        // Setup mocks before each test
        global.timerId = setInterval(() => {}, 1000);
        global.elapsedTime = 5000;
        global.isStopwatchMode = true;
        global.countdownDuration = 10000;
        global.isRunning = true;
        global.startBtn = { textContent: 'Stop' };
        global.updateDisplay = jest.fn();

        // Assign to local variables for test access
        timerId = global.timerId;
        elapsedTime = global.elapsedTime;
        isStopwatchMode = global.isStopwatchMode;
        countdownDuration = global.countdownDuration;
        isRunning = global.isRunning;
        startBtn = global.startBtn;
        updateDisplay = global.updateDisplay;

        // Mock clearInterval
        jest.spyOn(global, 'clearInterval');
    });

    afterEach(() => {
        // Clean up after each test
        jest.clearAllMocks();
        clearInterval(global.timerId);
    });

    test('should reset timer in stopwatch mode', () => {
        // Arrange
        isStopwatchMode = true;
        elapsedTime = 5000;

        // Act
        resetTimer();

        // Assert
        expect(clearInterval).toHaveBeenCalledWith(timerId);
        expect(elapsedTime).toBe(0);
        expect(isRunning).toBe(false);
        expect(startBtn.textContent).toBe('▶️ Start');
        expect(updateDisplay).toHaveBeenCalled();
    });

    test('should reset timer in countdown mode', () => {
        // Arrange
        isStopwatchMode = false;
        elapsedTime = 5000;
        countdownDuration = 10000;

        // Act
        resetTimer();

        // Assert
        expect(clearInterval).toHaveBeenCalledWith(timerId);
        expect(elapsedTime).toBe(countdownDuration);
        expect(isRunning).toBe(false);
        expect(startBtn.textContent).toBe('▶️ Start');
        expect(updateDisplay).toHaveBeenCalled();
    });

    test('should handle timer reset when no timer is running', () => {
        // Arrange
        timerId = null;
        isStopwatchMode = true;

        // Act
        resetTimer();

        // Assert
        expect(clearInterval).toHaveBeenCalledWith(null);
        expect(elapsedTime).toBe(0);
        expect(isRunning).toBe(false);
        expect(startBtn.textContent).toBe('▶️ Start');
        expect(updateDisplay).toHaveBeenCalled();
    });
});