// Import Jest testing utilities
const { jest } = require('@jest/globals');

// Mock global variables and functions
global.inputTime = '000000';
global.countdownDuration = 0;
global.updateDisplay = jest.fn();

// Import function to test
const updateCountdownFromInput = require('./script').updateCountdownFromInput;

describe('updateCountdownFromInput', () => {
    beforeEach(() => {
        // Reset mocks and global variables before each test
        jest.clearAllMocks();
        global.inputTime = '000000';
        global.countdownDuration = 0;
    });

    test('should correctly parse zero time input', () => {
        global.inputTime = '000000';
        updateCountdownFromInput();
        expect(global.countdownDuration).toBe(0);
        expect(global.updateDisplay).toHaveBeenCalledTimes(1);
    });

    test('should correctly parse hours only', () => {
        global.inputTime = '010000';
        updateCountdownFromInput();
        expect(global.countdownDuration).toBe(3600000); // 1 hour in milliseconds
        expect(global.updateDisplay).toHaveBeenCalledTimes(1);
    });

    test('should correctly parse minutes only', () => {
        global.inputTime = '000500';
        updateCountdownFromInput();
        expect(global.countdownDuration).toBe(300000); // 5 minutes in milliseconds
        expect(global.updateDisplay).toHaveBeenCalledTimes(1);
    });

    test('should correctly parse seconds only', () => {
        global.inputTime = '000030';
        updateCountdownFromInput();
        expect(global.countdownDuration).toBe(30000); // 30 seconds in milliseconds
        expect(global.updateDisplay).toHaveBeenCalledTimes(1);
    });

    test('should correctly parse combined time input', () => {
        global.inputTime = '012345'; // 1 hour, 23 minutes, 45 seconds
        updateCountdownFromInput();
        const expected = (1 * 3600 + 23 * 60 + 45) * 1000;
        expect(global.countdownDuration).toBe(expected);
        expect(global.updateDisplay).toHaveBeenCalledTimes(1);
    });

    test('should handle invalid number input as 0', () => {
        global.inputTime = 'abcdef';
        updateCountdownFromInput();
        expect(global.countdownDuration).toBe(0);
        expect(global.updateDisplay).toHaveBeenCalledTimes(1);
    });

    test('should handle partial invalid input', () => {
        global.inputTime = '01ab45';
        updateCountdownFromInput();
        const expected = (1 * 3600 + 0 * 60 + 45) * 1000;
        expect(global.countdownDuration).toBe(expected);
        expect(global.updateDisplay).toHaveBeenCalledTimes(1);
    });
});