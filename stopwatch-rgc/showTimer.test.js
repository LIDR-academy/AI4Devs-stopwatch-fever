// Import Jest testing utilities
const { jest } = require('@jest/globals');

describe('showTimer', () => {
    // Setup mocks and variables
    let modeSelection, timerContainer, numpad;
    let isStopwatchMode, inputTime, countdownDuration, elapsedTime;
    let clearTimer, updateDisplay;

    beforeEach(() => {
        // Mock DOM elements
        modeSelection = {
            classList: {
                add: jest.fn()
            }
        };
        timerContainer = {
            classList: {
                remove: jest.fn()
            }
        };
        numpad = {
            classList: {
                add: jest.fn(),
                remove: jest.fn()
            }
        };

        // Mock global variables
        global.modeSelection = modeSelection;
        global.timerContainer = timerContainer;
        global.numpad = numpad;
        global.inputTime = '000000';
        global.countdownDuration = 1000;
        global.elapsedTime = 1000;

        // Mock functions
        global.clearTimer = jest.fn();
        global.updateDisplay = jest.fn();

        // Import the function after setting up mocks
        const { showTimer } = require('./script.js');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should handle stopwatch mode correctly', () => {
        showTimer('stopwatch');

        // Verify function calls
        expect(clearTimer).toHaveBeenCalled();
        expect(modeSelection.classList.add).toHaveBeenCalledWith('hidden');
        expect(timerContainer.classList.remove).toHaveBeenCalledWith('hidden');
        expect(numpad.classList.add).toHaveBeenCalledWith('hidden');
        expect(updateDisplay).toHaveBeenCalled();

        // Verify state changes
        expect(isStopwatchMode).toBe(true);
        expect(elapsedTime).toBe(0);
    });

    test('should handle countdown mode correctly', () => {
        showTimer('countdown');

        // Verify function calls
        expect(clearTimer).toHaveBeenCalled();
        expect(modeSelection.classList.add).toHaveBeenCalledWith('hidden');
        expect(timerContainer.classList.remove).toHaveBeenCalledWith('hidden');
        expect(numpad.classList.remove).toHaveBeenCalledWith('hidden');
        expect(updateDisplay).toHaveBeenCalled();

        // Verify state changes
        expect(isStopwatchMode).toBe(false);
        expect(inputTime).toBe('000000');
        expect(countdownDuration).toBe(0);
        expect(elapsedTime).toBe(0);
    });

    test('should clear existing timer state', () => {
        showTimer('stopwatch');
        
        expect(clearTimer).toHaveBeenCalled();
        expect(elapsedTime).toBe(0);
    });

    test('should update display after mode change', () => {
        showTimer('stopwatch');
        
        expect(updateDisplay).toHaveBeenCalled();
        expect(updateDisplay).toHaveBeenCalledTimes(1);
    });

    test('should handle invalid mode gracefully', () => {
        showTimer('invalid');

        expect(clearTimer).toHaveBeenCalled();
        expect(isStopwatchMode).toBe(false);
        expect(updateDisplay).toHaveBeenCalled();
    });
});