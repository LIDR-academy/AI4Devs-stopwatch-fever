// Import Jest testing utilities
const { jest } = require('@jest/globals');

// Mock DOM elements and global variables
global.numpad = {
  classList: {
    add: jest.fn(),
    remove: jest.fn()
  }
};

global.inputTime = '000000';
global.countdownDuration = 0;
global.elapsedTime = 0;

// Mock the updateCountdownFromInput function
global.updateCountdownFromInput = jest.fn();

// Import the function to test
const { handleNumpadInput } = require('./script.js');

describe('handleNumpadInput', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    global.inputTime = '000000';
    global.countdownDuration = 0;
    global.elapsedTime = 0;
  });

  test('should handle Set button click', () => {
    // Arrange
    global.countdownDuration = 5000; // 5 seconds

    // Act
    handleNumpadInput('Set');

    // Assert
    expect(updateCountdownFromInput).toHaveBeenCalledTimes(1);
    expect(numpad.classList.add).toHaveBeenCalledWith('hidden');
    expect(global.elapsedTime).toBe(5000);
  });

  test('should handle Clear button click', () => {
    // Arrange
    global.inputTime = '123456';

    // Act
    handleNumpadInput('Clear');

    // Assert
    expect(global.inputTime).toBe('000000');
    expect(updateCountdownFromInput).toHaveBeenCalledTimes(1);
  });

  test('should handle numeric input', () => {
    // Arrange
    global.inputTime = '123456';

    // Act
    handleNumpadInput('7');

    // Assert
    expect(global.inputTime).toBe('234567');
    expect(updateCountdownFromInput).toHaveBeenCalledTimes(1);
  });

  test('should handle multiple numeric inputs', () => {
    // Act
    handleNumpadInput('1');
    handleNumpadInput('2');
    handleNumpadInput('3');

    // Assert
    expect(global.inputTime).toBe('000123');
    expect(updateCountdownFromInput).toHaveBeenCalledTimes(3);
  });

  test('should maintain 6-digit format when adding numbers', () => {
    // Arrange
    global.inputTime = '999999';

    // Act
    handleNumpadInput('8');

    // Assert
    expect(global.inputTime).toBe('999998');
    expect(updateCountdownFromInput).toHaveBeenCalledTimes(1);
  });
});